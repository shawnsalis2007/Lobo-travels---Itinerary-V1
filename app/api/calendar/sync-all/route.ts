import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarAccount, Itinerary, OperationalBooking, CalendarEventRef } from '@/types';

export const dynamic = 'force-dynamic';

function addDays(dateStr: string, days: number): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      calendarAccount,
      itineraries = [],
      bookings = []
    }: {
      calendarAccount?: GoogleCalendarAccount;
      itineraries?: Itinerary[];
      bookings?: OperationalBooking[];
    } = body;

    if (!calendarAccount || !calendarAccount.calendarId) {
      return NextResponse.json(
        { error: 'No connected Google Calendar account specified for synchronization.' },
        { status: 400 }
      );
    }

    let accessToken = calendarAccount.accessToken;
    let updatedAccessToken: string | undefined = undefined;
    let tokenExpiresAt = calendarAccount.tokenExpiresAt;

    // Check if access token is missing or near expiration, and refresh if refreshToken is available
    const isExpired = tokenExpiresAt ? Date.now() > tokenExpiresAt - 60000 : false;
    if ((!accessToken || isExpired) && calendarAccount.refreshToken) {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

      if (clientId && clientSecret) {
        try {
          const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              refresh_token: calendarAccount.refreshToken,
              grant_type: 'refresh_token',
            }),
          });

          const refreshData = await refreshRes.json();
          if (refreshRes.ok && refreshData.access_token) {
            accessToken = refreshData.access_token;
            updatedAccessToken = accessToken;
            tokenExpiresAt = Date.now() + Number(refreshData.expires_in || 3600) * 1000;
          }
        } catch (e) {
          console.error('[sync-all] Token refresh failed:', e);
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Google Calendar session token has expired. Please reconnect your Google Calendar in Settings.' },
        { status: 401 }
      );
    }

    const targetCalendarId = calendarAccount.calendarId || 'primary';
    const accountId = calendarAccount.id;

    let syncedCount = 0;
    const syncedBookings: { id: string; calendarEventIds: CalendarEventRef[] }[] = [];
    const syncedItineraries: { id: string; googleCalendarEventId: string; calendarEventIds: CalendarEventRef[] }[] = [];
    const errors: string[] = [];

    // Map to keep track of tours already scheduled via bookings to avoid duplicate itinerary events
    const scheduledTourIdentifiers = new Set<string>();

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. Sync Operational Bookings (with Reminder Schedules)
    // ─────────────────────────────────────────────────────────────────────────────
    for (const b of bookings) {
      if (b.status === 'cancelled') continue;
      if (!b.startDate || !b.endDate) continue;

      if (b.itineraryId) scheduledTourIdentifiers.add(b.itineraryId);
      if (b.itineraryRef) scheduledTourIdentifiers.add(b.itineraryRef);

      // Deduplication check: check if event is already registered on this calendar account
      const alreadyHasEvent = Array.isArray(b.calendarEventIds) &&
        b.calendarEventIds.some((ref) => ref.calendarAccountId === accountId && ref.eventId);

      if (alreadyHasEvent) {
        continue; // Deduplicated — skip creating duplicate
      }

      // Compute Google Calendar reminder popups
      const reminderOverrides: { method: 'popup'; minutes: number }[] = [];
      if (Array.isArray(b.reminders) && b.reminders.length > 0) {
        for (const rem of b.reminders) {
          if (rem.type === 'offset' && typeof rem.offsetDays === 'number' && rem.offsetDays > 0) {
            reminderOverrides.push({ method: 'popup', minutes: rem.offsetDays * 24 * 60 });
          } else if (rem.type === 'custom' && rem.customDateTime) {
            const remTime = new Date(rem.customDateTime).getTime();
            const startTime = new Date(b.startDate).getTime();
            if (remTime < startTime) {
              const diffMins = Math.round((startTime - remTime) / (60 * 1000));
              if (diffMins > 0) reminderOverrides.push({ method: 'popup', minutes: diffMins });
            }
          }
        }
      }

      // Fallback default operational reminders if none are explicitly configured
      if (reminderOverrides.length === 0) {
        reminderOverrides.push({ method: 'popup', minutes: 7 * 24 * 60 }); // 7 days prior
        reminderOverrides.push({ method: 'popup', minutes: 2 * 24 * 60 }); // 2 days prior
      }

      const descriptionLines = [
        `Tour Package: ${b.tourPackageName}`,
        `Lead Guest: ${b.client?.name || 'Client'}`,
        b.client?.phone ? `Phone: ${b.client.phone}` : '',
        b.client?.email ? `Email: ${b.client.email}` : '',
        b.flightOrArrivalDetails ? `Arrival Details: ${b.flightOrArrivalDetails}` : '',
        b.vehicleDisplay ? `Vehicle: ${b.vehicleDisplay}` : '',
        typeof b.tourCost === 'number' ? `Tour Value: ₹${b.tourCost.toLocaleString('en-IN')}` : '',
        b.voucherNo ? `Voucher Ref: ${b.voucherNo}` : '',
        b.itineraryRef ? `Itinerary Ref: ${b.itineraryRef}` : '',
        '',
        'Synchronized via Lobo Travels Tour Operations Management'
      ].filter(Boolean).join('\n');

      const eventPayload = {
        summary: `[${b.voucherNo || b.itineraryRef || 'Booking'}] ${b.tourPackageName} — ${b.client?.name || 'Guest'}`,
        description: descriptionLines,
        start: { date: b.startDate },
        end: { date: addDays(b.endDate, 1) }, // Google Calendar all-day event end is exclusive
        reminders: {
          useDefault: false,
          overrides: reminderOverrides.slice(0, 5), // Google API allows max 5 overrides
        },
      };

      try {
        const eventRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventPayload),
          }
        );

        if (!eventRes.ok) {
          const errText = await eventRes.text();
          errors.push(`Booking ${b.voucherNo || b.id}: ${errText}`);
          continue;
        }

        const eventData = await eventRes.json();
        const updatedRefs: CalendarEventRef[] = [
          ...(b.calendarEventIds || []),
          { calendarAccountId: accountId, eventId: eventData.id }
        ];

        syncedBookings.push({
          id: b.id,
          calendarEventIds: updatedRefs,
        });
        syncedCount++;
      } catch (err: unknown) {
        errors.push(`Booking ${b.voucherNo || b.id}: ${err instanceof Error ? err.message : 'Unknown exception'}`);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. Sync Existing Active Itineraries
    // ─────────────────────────────────────────────────────────────────────────────
    for (const itin of itineraries) {
      if (itin.status === 'Cancelled') continue;
      if (itin.datesNotConfirmed || !itin.startDate || !itin.endDate) continue;

      // Deduplication check 1: Already has Google Calendar event recorded
      const alreadyHasEvent = !!itin.googleCalendarEventId || (
        Array.isArray(itin.calendarEventIds) &&
        itin.calendarEventIds.some((ref) => ref.calendarAccountId === accountId && ref.eventId)
      );

      if (alreadyHasEvent) {
        continue; // Deduplicated
      }

      // Deduplication check 2: Tour was already synced via its operational booking
      if (scheduledTourIdentifiers.has(itin.id) || scheduledTourIdentifiers.has(itin.referenceNumber)) {
        // Link to booking's event ID if available
        const matchingBooking = syncedBookings.find((sb) => {
          const orig = bookings.find((b) => b.id === sb.id);
          return orig && (orig.itineraryId === itin.id || orig.itineraryRef === itin.referenceNumber);
        });
        if (matchingBooking) {
          const ref = matchingBooking.calendarEventIds.find((r) => r.calendarAccountId === accountId);
          if (ref) {
            syncedItineraries.push({
              id: itin.id,
              googleCalendarEventId: ref.eventId,
              calendarEventIds: [ref],
            });
          }
        }
        continue;
      }

      // Standalone itinerary: create dedicated calendar event
      const destSummary = itin.days
        ?.map((d) => d.overnightLocation || d.destination)
        .filter(Boolean)
        .slice(0, 5)
        .join(' → ');

      const descriptionLines = [
        `Tour: ${itin.tourName}`,
        `Reference: ${itin.referenceNumber}`,
        `Lead Guest: ${itin.clientName || 'Guest'}`,
        itin.clientPhone ? `Phone: ${itin.clientPhone}` : '',
        itin.clientEmail ? `Email: ${itin.clientEmail}` : '',
        itin.paxSummary ? `Guests: ${itin.paxSummary}` : '',
        itin.vehicleDisplay ? `Vehicle: ${itin.vehicleDisplay}` : '',
        destSummary ? `Circuit: ${destSummary}` : '',
        typeof itin.totalCost === 'number' ? `Total Package: ₹${itin.totalCost.toLocaleString('en-IN')}` : '',
        '',
        'Synchronized via Lobo Travels Tour Operations Management'
      ].filter(Boolean).join('\n');

      const eventPayload = {
        summary: `[${itin.referenceNumber}] ${itin.tourName} — ${itin.clientName || 'Guest'}`,
        description: descriptionLines,
        start: { date: itin.startDate },
        end: { date: addDays(itin.endDate, 1) },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 7 * 24 * 60 },
            { method: 'popup', minutes: 2 * 24 * 60 },
          ],
        },
      };

      try {
        const eventRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventPayload),
          }
        );

        if (!eventRes.ok) {
          const errText = await eventRes.text();
          errors.push(`Itinerary ${itin.referenceNumber}: ${errText}`);
          continue;
        }

        const eventData = await eventRes.json();
        const eventRef: CalendarEventRef = {
          calendarAccountId: accountId,
          eventId: eventData.id,
        };

        syncedItineraries.push({
          id: itin.id,
          googleCalendarEventId: eventData.id,
          calendarEventIds: [eventRef],
        });
        syncedCount++;
      } catch (err: unknown) {
        errors.push(`Itinerary ${itin.referenceNumber}: ${err instanceof Error ? err.message : 'Unknown exception'}`);
      }
    }

    const message = syncedCount > 0
      ? `Successfully synchronized ${syncedCount} tour itinerary & reminder event${syncedCount === 1 ? '' : 's'} to Google Calendar.`
      : `All active itineraries and booking reminders are already synchronized (0 duplicates created).`;

    return NextResponse.json({
      success: true,
      syncedCount,
      totalConsidered: bookings.length + itineraries.length,
      syncedBookings,
      syncedItineraries,
      updatedAccessToken,
      tokenExpiresAt,
      errors: errors.length > 0 ? errors : undefined,
      message,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal calendar sync exception';
    console.error('[sync-all error]:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
