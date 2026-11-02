import { GoogleCalendarAccount, OperationalBooking, CalendarEventRef } from '@/types';
import { getDbSettings, saveDbBooking, DEFAULT_BRAND_ID } from '@/lib/db';

/**
 * Resolves the appropriate Google Calendar ID based on environment variables,
 * brand configuration, and user email delegation for Russel, Shawn, or Lobo Travels.
 */
export function resolveTargetCalendarId(
  account?: Partial<GoogleCalendarAccount>,
  context?: { email?: string; brandId?: string }
): string {
  const email = (account?.googleEmail || context?.email || '').toLowerCase().trim();
  const label = (account?.label || '').toLowerCase();

  // 1. Russel Gomes mapping
  if (email.includes('russel') || email === 'russelgomes12@gmail.com' || label.includes('russel')) {
    const envRussel =
      process.env.GOOGLE_CALENDAR_ID_RUSSEL ||
      process.env.GOOGLE_CALENDAR_ID_RUSSELGOMES;
    if (envRussel) return envRussel;
    if (process.env.GOOGLE_CALENDAR_ID) return process.env.GOOGLE_CALENDAR_ID;
    return account?.calendarId || 'primary';
  }

  // 2. Shawn Salis mapping
  if (email.includes('shawn') || email === 'shawnsalis2007@gmail.com' || label.includes('shawn')) {
    const envShawn =
      process.env.GOOGLE_CALENDAR_ID_SHAWN ||
      process.env.GOOGLE_CALENDAR_ID_SHAWNSALIS;
    if (envShawn) return envShawn;
    if (process.env.GOOGLE_CALENDAR_ID) return process.env.GOOGLE_CALENDAR_ID;
    return account?.calendarId || 'primary';
  }

  // 3. Lobo Travels Brand mapping
  if (
    email.includes('lobo') ||
    label.includes('lobo') ||
    context?.brandId === DEFAULT_BRAND_ID ||
    context?.brandId === 'brand-lobo-travels'
  ) {
    const envLobo =
      process.env.GOOGLE_CALENDAR_ID_LOBO ||
      process.env.GOOGLE_CALENDAR_ID_LOBO_TRAVELS;
    if (envLobo) return envLobo;
    if (process.env.GOOGLE_CALENDAR_ID) return process.env.GOOGLE_CALENDAR_ID;
    return account?.calendarId || 'primary';
  }

  return process.env.GOOGLE_CALENDAR_ID || account?.calendarId || 'primary';
}

/**
 * Checks whether an operational booking is under Lobo Travels or assigned to Russel/Shawn.
 */
export function isBookingForRusselOrShawnOrLobo(
  booking: OperationalBooking,
  brandId?: string
): {
  isLoboBrand: boolean;
  isRussel: boolean;
  isShawn: boolean;
  matches: boolean;
} {
  const bBrand = (booking.brandId || brandId || '').toLowerCase();
  const isLoboBrand =
    bBrand === DEFAULT_BRAND_ID.toLowerCase() ||
    bBrand === 'brand-lobo-travels' ||
    bBrand.includes('lobo') ||
    bBrand === '';

  const text = [
    booking.assignedTo,
    booking.assignedUserEmail,
    booking.createdBy,
    booking.tourPackageName,
    booking.notes,
    booking.client?.name,
    booking.client?.email,
    booking.outsourced?.vendorCompanyName,
    booking.outsourced?.vendorContactPerson,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const isRussel = text.includes('russel') || text.includes('russelgomes12@gmail.com');
  const isShawn = text.includes('shawn') || text.includes('shawnsalis2007@gmail.com');

  return {
    isLoboBrand,
    isRussel,
    isShawn,
    matches: isLoboBrand || isRussel || isShawn,
  };
}

/**
 * Refreshes an access token on the server using Google OAuth refresh token.
 */
export async function refreshGoogleAccessTokenServer(
  refreshToken: string
): Promise<{ accessToken: string; tokenExpiresAt: number } | null> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = await res.json();
    if (res.ok && data.access_token) {
      return {
        accessToken: data.access_token,
        tokenExpiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
      };
    }
  } catch (err) {
    console.error('[calendar-server] Error refreshing Google token:', err);
  }
  return null;
}

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const d = new Date(Date.UTC(year, month, day + days));
      return d.toISOString().split('T')[0];
    }
  }
  return dateStr;
}

/**
 * Automatically creates or updates the Google Calendar event for an operational booking.
 * Dispatches to Russel's calendar, Shawn's calendar, and/or Lobo Travels brand calendar.
 */
export async function syncBookingToGoogleCalendarServer(
  booking: OperationalBooking,
  brandId?: string
): Promise<{ success: boolean; eventRefs: CalendarEventRef[]; errors: string[] }> {
  const effectiveBrandId = brandId || booking.brandId || DEFAULT_BRAND_ID;
  const targetCheck = isBookingForRusselOrShawnOrLobo(booking, effectiveBrandId);

  // If not relevant to Lobo Travels or Russel/Shawn, skip
  if (!targetCheck.matches) {
    return { success: true, eventRefs: booking.calendarEventIds || [], errors: [] };
  }

  if (booking.status === 'cancelled' || !booking.startDate || !booking.endDate) {
    return { success: true, eventRefs: booking.calendarEventIds || [], errors: [] };
  }

  const errors: string[] = [];
  const eventRefs: CalendarEventRef[] = Array.isArray(booking.calendarEventIds)
    ? [...booking.calendarEventIds]
    : [];

  try {
    const settings = await getDbSettings(effectiveBrandId);
    let accounts: GoogleCalendarAccount[] = settings?.connectedCalendars || [];

    // Synthesize environment-based account if no calendar is connected in DB but env variables exist
    if (accounts.length === 0 && process.env.GOOGLE_REFRESH_TOKEN) {
      accounts.push({
        id: 'gcal-env-lobo',
        label: 'Lobo Travels (Env Sync)',
        googleEmail: process.env.GOOGLE_CALENDAR_EMAIL || 'info@lobostravelwizard.com',
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        isDefault: true,
        connectionStatus: 'connected',
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      });
    }

    if (accounts.length === 0) {
      return {
        success: false,
        eventRefs,
        errors: ['No connected Google Calendar accounts found in brand settings or environment.'],
      };
    }

    // Determine target accounts based on assignment
    const targetAccounts: GoogleCalendarAccount[] = [];

    for (const acc of accounts) {
      const email = (acc.googleEmail || '').toLowerCase();
      const label = (acc.label || '').toLowerCase();
      const isRusselAcc = email.includes('russel') || email === 'russelgomes12@gmail.com' || label.includes('russel');
      const isShawnAcc = email.includes('shawn') || email === 'shawnsalis2007@gmail.com' || label.includes('shawn');

      if (targetCheck.isRussel && isRusselAcc) {
        targetAccounts.push(acc);
      } else if (targetCheck.isShawn && isShawnAcc) {
        targetAccounts.push(acc);
      } else if (targetCheck.isLoboBrand && (acc.isDefault || isRusselAcc || isShawnAcc || label.includes('lobo'))) {
        targetAccounts.push(acc);
      }
    }

    // Fallback: if specific matching didn't yield an account, use default or first connected account
    const accountsToSync = targetAccounts.length > 0 ? targetAccounts : [accounts[0]];

    for (const acc of accountsToSync) {
      // Check if already synced on this account
      const alreadySynced = eventRefs.some(
        (ref) => (ref.calendarAccountId === acc.id || ref.calendarAccountId === acc.googleEmail) && ref.eventId
      );
      if (alreadySynced) continue;

      let token = acc.accessToken;
      const isExpired = acc.tokenExpiresAt ? Date.now() > acc.tokenExpiresAt - 60000 : false;

      if ((!token || isExpired) && acc.refreshToken) {
        const refreshed = await refreshGoogleAccessTokenServer(acc.refreshToken);
        if (refreshed) {
          token = refreshed.accessToken;
          acc.accessToken = refreshed.accessToken;
          acc.tokenExpiresAt = refreshed.tokenExpiresAt;
        }
      }

      if (!token) {
        errors.push(`Account ${acc.label} (${acc.googleEmail}) has no valid access token.`);
        continue;
      }

      const targetCalId = resolveTargetCalendarId(acc, {
        email: acc.googleEmail,
        brandId: effectiveBrandId,
      });

      const descriptionLines = [
        `Tour Package: ${booking.tourPackageName}`,
        `Lead Guest: ${booking.client?.name || 'Client'}`,
        booking.client?.phone ? `Phone: ${booking.client.phone}` : '',
        booking.client?.email ? `Email: ${booking.client.email}` : '',
        booking.flightOrArrivalDetails ? `Arrival Details: ${booking.flightOrArrivalDetails}` : '',
        booking.vehicleDisplay ? `Vehicle: ${booking.vehicleDisplay}` : '',
        booking.assignedTo ? `Assigned Dispatcher: ${booking.assignedTo}` : '',
        typeof booking.tourCost === 'number' ? `Tour Value: ₹${booking.tourCost.toLocaleString('en-IN')}` : '',
        booking.voucherNo ? `Voucher Ref: ${booking.voucherNo}` : '',
        booking.itineraryRef ? `Itinerary Ref: ${booking.itineraryRef}` : '',
        booking.notes ? `Notes: ${booking.notes}` : '',
        '',
        "Synchronized via Lobo's Travel Wizard (Lobo Travels Fleet Operations)"
      ]
        .filter(Boolean)
        .join('\n');

      const eventPayload = {
        summary: `[${booking.voucherNo || booking.itineraryRef || 'Booking'}] ${booking.tourPackageName} — ${booking.client?.name || 'Guest'}`,
        description: descriptionLines,
        start: { date: booking.startDate },
        end: { date: addDays(booking.endDate, 1) },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 7 * 24 * 60 }, // 7 days
            { method: 'popup', minutes: 1 * 24 * 60 }, // 1 day
            { method: 'popup', minutes: 3 * 60 },      // 3 hours
          ],
        },
      };

      const eventRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalId)}/events`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        }
      );

      if (eventRes.ok) {
        const eventData = await eventRes.json();
        if (eventData?.id) {
          const newRef: CalendarEventRef = {
            calendarAccountId: acc.id,
            eventId: eventData.id,
          };
          eventRefs.push(newRef);
        }
      } else {
        const errText = await eventRes.text();
        errors.push(`Google API error for ${acc.label} (${targetCalId}): ${errText}`);
      }
    }

    if (eventRefs.length > (booking.calendarEventIds?.length || 0)) {
      booking.calendarEventIds = eventRefs;
      await saveDbBooking(booking);
    }

    return {
      success: errors.length === 0,
      eventRefs,
      errors,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown exception in syncBookingToGoogleCalendarServer';
    errors.push(msg);
    return { success: false, eventRefs, errors };
  }
}
