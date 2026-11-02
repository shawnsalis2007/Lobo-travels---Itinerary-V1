import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarAccount, Itinerary, OperationalBooking, CalendarEventRef } from '@/types';
import { resolveTargetCalendarId } from '@/lib/calendar-server';
import { saveDbBooking, saveDbItinerary } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      calendarAccount,
      calendarAccounts,
      itineraries = [],
      bookings = []
    }: {
      calendarAccount?: GoogleCalendarAccount;
      calendarAccounts?: GoogleCalendarAccount[];
      itineraries?: Itinerary[];
      bookings?: OperationalBooking[];
    } = body;

    const rawAccounts: GoogleCalendarAccount[] = Array.isArray(calendarAccounts) && calendarAccounts.length > 0
      ? calendarAccounts
      : calendarAccount
      ? [calendarAccount]
      : [];

    if (rawAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No connected Google Calendar account specified for synchronization.' },
        { status: 400 }
      );
    }

    let totalSyncedCount = 0;
    const syncedBookingsMap = new Map<string, CalendarEventRef[]>();
    const syncedItinerariesMap = new Map<string, { googleCalendarEventId: string; calendarEventIds: CalendarEventRef[] }>();
    const errors: string[] = [];
    const skippedReason: string[] = [];

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    for (const acc of rawAccounts) {
      let accessToken = acc.accessToken;
      let tokenExpiresAt = acc.tokenExpiresAt;

      // Refresh token if needed
      const isExpired = tokenExpiresAt ? Date.now() > tokenExpiresAt - 60000 : false;
      if ((!accessToken || isExpired) && acc.refreshToken && clientId && clientSecret) {
        try {
          const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              refresh_token: acc.refreshToken,
              grant_type: 'refresh_token',
            }),
          });
          const refreshData = await refreshRes.json();
          if (refreshRes.ok && refreshData.access_token) {
            accessToken = refreshData.access_token;
            tokenExpiresAt = Date.now() + Number(refreshData.expires_in || 3600) * 1000;
          }
        } catch (e) {
          console.error(`[sync-all] Token refresh failed for ${acc.label}:`, e);
        }
      }

      if (!accessToken) {
        errors.push(`Account ${acc.label} (${acc.googleEmail}): token expired and could not be refreshed.`);
        continue;
      }

      // Resolve calendar ID (e.g. GOOGLE_CALENDAR_ID_RUSSEL for Russelgomes12@gmail.com, etc.)
      const targetCalendarId = resolveTargetCalendarId(acc);
      const accountId = acc.id;

      // ─────────────────────────────────────────────────────────────────────────────
      // 1. Sync Itineraries
      // ─────────────────────────────────────────────────────────────────────────────
      for (const itin of itineraries) {
        if (itin.status === 'Cancelled') {
          skippedReason.push(`Itinerary ${itin.referenceNumber}: status is Cancelled`);
          continue;
        }

        const effectiveStartDate = itin.startDate;
        const effectiveEndDate = itin.endDate || itin.startDate;
        if (!effectiveStartDate || !effectiveEndDate) {
          skippedReason.push(`Itinerary ${itin.referenceNumber}: dates not set`);
          continue;
        }

        const alreadySynced = Array.isArray(itin.calendarEventIds) &&
          itin.calendarEventIds.some((ref) => (ref.calendarAccountId === accountId || ref.calendarAccountId === acc.googleEmail) && ref.eventId);

        if (alreadySynced) {
          continue;
        }

        const descriptionLines = [
          `Tour: ${itin.tourName}`,
          `Lead Guest: ${itin.clientName}`,
          itin.clientPhone ? `Phone: ${itin.clientPhone}` : '',
          itin.clientEmail ? `Email: ${itin.clientEmail}` : '',
          itin.vehicleDisplay ? `Vehicle: ${itin.vehicleDisplay}` : '',
          `Total Value: ₹${(itin.totalCost || 0).toLocaleString('en-IN')}`,
          itin.referenceNumber ? `Ref: ${itin.referenceNumber}` : '',
          '',
          "Synchronized via Lobo's Travel Wizard Operations"
        ].filter(Boolean).join('\n');

        const eventPayload = {
          summary: `[${itin.referenceNumber || 'Tour'}] ${itin.tourName} — ${itin.clientName}`,
          description: descriptionLines,
          start: { date: effectiveStartDate },
          end: { date: addDays(effectiveEndDate, 1) },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'popup', minutes: 7 * 24 * 60 },
              { method: 'popup', minutes: 1 * 24 * 60 },
            ],
          },
        };

        try {
          const res = await fetch(
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

          if (!res.ok) {
            const errText = await res.text();
            errors.push(`Itinerary ${itin.referenceNumber} on ${acc.label} (${targetCalendarId}): ${errText}`);
            continue;
          }

          const evData = await res.json();
          const existingRefs = syncedItinerariesMap.get(itin.id)?.calendarEventIds || itin.calendarEventIds || [];
          const newRefs = [...existingRefs, { calendarAccountId: accountId, eventId: evData.id }];
          syncedItinerariesMap.set(itin.id, {
            googleCalendarEventId: evData.id,
            calendarEventIds: newRefs,
          });

          // Persist to Postgres
          await saveDbItinerary({ ...itin, calendarEventIds: newRefs });
          totalSyncedCount++;
        } catch (itinErr: unknown) {
          const msg = itinErr instanceof Error ? itinErr.message : 'Unknown error';
          errors.push(`Itinerary ${itin.referenceNumber}: ${msg}`);
        }
      }

      // ─────────────────────────────────────────────────────────────────────────────
      // 2. Sync Operational Bookings (Internal & External)
      // ─────────────────────────────────────────────────────────────────────────────
      for (const b of bookings) {
        if (b.status === 'cancelled' || !b.startDate || !b.endDate) continue;

        const alreadySynced = Array.isArray(b.calendarEventIds) &&
          b.calendarEventIds.some((ref) => (ref.calendarAccountId === accountId || ref.calendarAccountId === acc.googleEmail) && ref.eventId);

        if (alreadySynced) continue;

        const descriptionLines = [
          `Tour Package: ${b.tourPackageName}`,
          `Lead Guest: ${b.client?.name || 'Client'}`,
          b.client?.phone ? `Phone: ${b.client.phone}` : '',
          b.client?.email ? `Email: ${b.client.email}` : '',
          b.flightOrArrivalDetails ? `Arrival Details: ${b.flightOrArrivalDetails}` : '',
          b.vehicleDisplay ? `Vehicle: ${b.vehicleDisplay}` : '',
          b.assignedTo ? `Assigned Dispatcher: ${b.assignedTo}` : '',
          typeof b.tourCost === 'number' ? `Tour Value: ₹${b.tourCost.toLocaleString('en-IN')}` : '',
          b.voucherNo ? `Voucher Ref: ${b.voucherNo}` : '',
          b.itineraryRef ? `Itinerary Ref: ${b.itineraryRef}` : '',
          b.notes ? `Notes: ${b.notes}` : '',
          '',
          "Synchronized via Lobo's Travel Wizard (Lobo Travels Operations)"
        ].filter(Boolean).join('\n');

        const eventPayload = {
          summary: `[${b.voucherNo || b.itineraryRef || 'Booking'}] ${b.tourPackageName} — ${b.client?.name || 'Guest'}`,
          description: descriptionLines,
          start: { date: b.startDate },
          end: { date: addDays(b.endDate, 1) },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'popup', minutes: 7 * 24 * 60 },
              { method: 'popup', minutes: 1 * 24 * 60 },
              { method: 'popup', minutes: 3 * 60 },
            ],
          },
        };

        try {
          const res = await fetch(
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

          if (!res.ok) {
            const errText = await res.text();
            errors.push(`Booking ${b.voucherNo || b.id} on ${acc.label} (${targetCalendarId}): ${errText}`);
            continue;
          }

          const evData = await res.json();
          const existingRefs = syncedBookingsMap.get(b.id) || b.calendarEventIds || [];
          const newRefs = [...existingRefs, { calendarAccountId: accountId, eventId: evData.id }];
          syncedBookingsMap.set(b.id, newRefs);

          // Persist to Postgres
          await saveDbBooking({ ...b, calendarEventIds: newRefs });
          totalSyncedCount++;
        } catch (bkErr: unknown) {
          const msg = bkErr instanceof Error ? bkErr.message : 'Unknown error';
          errors.push(`Booking ${b.voucherNo || b.id}: ${msg}`);
        }
      }
    }

    const syncedBookings = Array.from(syncedBookingsMap.entries()).map(([id, calendarEventIds]) => ({
      id,
      calendarEventIds,
    }));

    const syncedItineraries = Array.from(syncedItinerariesMap.entries()).map(([id, data]) => ({
      id,
      googleCalendarEventId: data.googleCalendarEventId,
      calendarEventIds: data.calendarEventIds,
    }));

    if (errors.length > 0 && totalSyncedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Google Calendar sync error: ${errors[0]}`,
          errors,
          skippedReason,
        },
        { status: 400 }
      );
    }

    const message = totalSyncedCount > 0
      ? `Successfully synchronized ${totalSyncedCount} event${totalSyncedCount === 1 ? '' : 's'} across ${rawAccounts.length} Google Calendar account${rawAccounts.length === 1 ? '' : 's'}!`
      : `All items are already synchronized on the connected Google Calendars.`;

    return NextResponse.json({
      success: true,
      syncedCount: totalSyncedCount,
      totalConsidered: itineraries.length + bookings.length,
      syncedBookings,
      syncedItineraries,
      errors: errors.length > 0 ? errors : undefined,
      message,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('API /api/calendar/sync-all POST error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
