import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarAccount, Itinerary, OperationalBooking, CalendarEventRef } from '@/types';

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

    if (!calendarAccount) {
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
        { error: 'Google Calendar session token has expired or is invalid. Please reconnect your Google Calendar in Settings.' },
        { status: 401 }
      );
    }

    // Force 'primary' calendar so events always land in the user's main personal/primary calendar view
    const targetCalendarId = 'primary';
    const accountId = calendarAccount.id;

    let syncedCount = 0;
    const syncedBookings: { id: string; calendarEventIds: CalendarEventRef[] }[] = [];
    const syncedItineraries: { id: string; googleCalendarEventId: string; calendarEventIds: CalendarEventRef[] }[] = [];
    const errors: string[] = [];
    const skippedReason: string[] = [];

    // Track which itinerary IDs and references have been scheduled to avoid any duplicate events
    const processedTours = new Set<string>();

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. Sync Itineraries (The primary data source for the Lobo Travels Dashboard)
    // ─────────────────────────────────────────────────────────────────────────────
    for (const itin of itineraries) {
      if (itin.status === 'Cancelled') {
        skippedReason.push(`Itinerary ${itin.referenceNumber}: status is Cancelled`);
        continue;
      }

      const effectiveStartDate = itin.startDate;
      const effectiveEndDate = itin.endDate || itin.startDate;

      if (!effectiveStartDate || !effectiveEndDate) {
        skippedReason.push(`Itinerary ${itin.referenceNumber}: tour dates not confirmed`);
        continue;
      }

      // Check if an operational booking exists for this tour
      const matchingBooking = bookings.find(
        (b) => (b.itineraryId && b.itineraryId === itin.id) || (b.itineraryRef && b.itineraryRef === itin.referenceNumber)
      );

      // Deduplication check: Check if an event already exists on this account for the itinerary
      const itineraryAlreadySynced = Array.isArray(itin.calendarEventIds) &&
        itin.calendarEventIds.some((ref) => (ref.calendarAccountId === accountId || ref.calendarAccountId === 'primary') && ref.eventId);

      // Deduplication check: Check if matching operational booking already has an event on this account
      const bookingAlreadySynced = matchingBooking && Array.isArray(matchingBooking.calendarEventIds) &&
        matchingBooking.calendarEventIds.some((ref) => (ref.calendarAccountId === accountId || ref.calendarAccountId === 'primary') && ref.eventId);

      if (itineraryAlreadySynced || bookingAlreadySynced) {
        // Already synchronized on this Google Calendar account
        if (bookingAlreadySynced && matchingBooking && !itineraryAlreadySynced) {
          const ref = matchingBooking.calendarEventIds.find((r) => r.calendarAccountId === accountId || r.calendarAccountId === 'primary');
          if (ref) {
            syncedItineraries.push({
              id: itin.id,
              googleCalendarEventId: ref.eventId,
              calendarEventIds: [ref],
            });
          }
        }
        processedTours.add(itin.id);
        processedTours.add(itin.referenceNumber);
        continue;
      }

      // Compute Google Calendar reminder popups
      const reminderOverrides: { method: 'popup'; minutes: number }[] = [];
      if (matchingBooking && Array.isArray(matchingBooking.reminders) && matchingBooking.reminders.length > 0) {
        for (const rem of matchingBooking.reminders) {
          if (rem.type === 'offset' && typeof rem.offsetDays === 'number' && rem.offsetDays > 0) {
            const mins = Math.min(rem.offsetDays * 24 * 60, 40320); // Google max 4 weeks
            reminderOverrides.push({ method: 'popup', minutes: mins });
          } else if (rem.type === 'custom' && rem.customDateTime) {
            const remTime = new Date(rem.customDateTime).getTime();
            const startTime = new Date(effectiveStartDate).getTime();
            if (remTime < startTime) {
              const diffMins = Math.round((startTime - remTime) / (60 * 1000));
              if (diffMins > 0 && diffMins <= 40320) {
                reminderOverrides.push({ method: 'popup', minutes: diffMins });
              }
            }
          }
        }
      }

      // Default operational reminders if none are configured (7 days and 1 day prior)
      if (reminderOverrides.length === 0) {
        reminderOverrides.push({ method: 'popup', minutes: 7 * 24 * 60 }); // 7 days prior (10080 mins)
        reminderOverrides.push({ method: 'popup', minutes: 1 * 24 * 60 }); // 1 day prior (1440 mins)
      }

      const destSummary = itin.days
        ?.map((d) => d.overnightLocation || d.destination)
        .filter(Boolean)
        .slice(0, 6)
        .join(' → ');

      const clientDisplayName = itin.clientName || matchingBooking?.client?.name || 'Valued Guest';
      const clientPhone = itin.clientPhone || matchingBooking?.client?.phone;
      const clientEmail = itin.clientEmail || matchingBooking?.client?.email;
      const voucherRef = matchingBooking?.voucherNo;
      const arrivalInfo = matchingBooking?.flightOrArrivalDetails;
      const totalCostFormatted = typeof itin.totalCost === 'number' ? `₹${itin.totalCost.toLocaleString('en-IN')}` : '';

      const descriptionLines = [
        `Tour Package: ${itin.tourName}`,
        `Proposal Ref: ${itin.referenceNumber}`,
        voucherRef ? `Voucher Ref: ${voucherRef}` : '',
        `Lead Guest: ${clientDisplayName}`,
        clientPhone ? `Phone: ${clientPhone}` : '',
        clientEmail ? `Email: ${clientEmail}` : '',
        itin.paxSummary ? `Travelers: ${itin.paxSummary}` : '',
        itin.vehicleDisplay ? `Vehicle Assigned: ${itin.vehicleDisplay}` : '',
        destSummary ? `Route: ${destSummary}` : '',
        arrivalInfo ? `Arrival / Flight: ${arrivalInfo}` : '',
        totalCostFormatted ? `Total Package Value: ${totalCostFormatted}` : '',
        '',
        'Synchronized via Lobo Travels Tour Operations Management'
      ].filter(Boolean).join('\n');

      const eventPayload = {
        summary: `[${voucherRef || itin.referenceNumber}] ${itin.tourName} — ${clientDisplayName}`,
        description: descriptionLines,
        start: { date: effectiveStartDate },
        end: { date: addDays(effectiveEndDate, 1) }, // Google Calendar all-day event end date is exclusive
        reminders: {
          useDefault: false,
          overrides: reminderOverrides.slice(0, 5), // Google allows max 5 overrides
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
          console.error(`[sync-all] Google API Error on Itinerary ${itin.referenceNumber}:`, errText);
          errors.push(`Itinerary ${itin.referenceNumber}: ${errText}`);
          continue;
        }

        const eventData = await eventRes.json();
        const eventRef: CalendarEventRef = {
          calendarAccountId: accountId,
          eventId: eventData.id,
        };

        const updatedItinRefs = [
          ...(itin.calendarEventIds || []),
          eventRef
        ];

        syncedItineraries.push({
          id: itin.id,
          googleCalendarEventId: eventData.id,
          calendarEventIds: updatedItinRefs,
        });

        // Also associate event ID with matching operational booking if present
        if (matchingBooking) {
          const updatedBookingRefs = [
            ...(matchingBooking.calendarEventIds || []),
            eventRef
          ];
          syncedBookings.push({
            id: matchingBooking.id,
            calendarEventIds: updatedBookingRefs,
          });
        }

        processedTours.add(itin.id);
        processedTours.add(itin.referenceNumber);
        syncedCount++;
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Unknown exception';
        console.error(`[sync-all] Exception on Itinerary ${itin.referenceNumber}:`, err);
        errors.push(`Itinerary ${itin.referenceNumber}: ${errMsg}`);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. Sync Any Standalone Operational Bookings (not already processed above)
    // ─────────────────────────────────────────────────────────────────────────────
    for (const b of bookings) {
      if (b.status === 'cancelled') continue;
      if (!b.startDate || !b.endDate) continue;

      if (processedTours.has(b.id) || (b.itineraryId && processedTours.has(b.itineraryId)) || (b.itineraryRef && processedTours.has(b.itineraryRef))) {
        continue; // Already processed
      }

      const alreadyHasEvent = Array.isArray(b.calendarEventIds) &&
        b.calendarEventIds.some((ref) => (ref.calendarAccountId === accountId || ref.calendarAccountId === 'primary') && ref.eventId);

      if (alreadyHasEvent) {
        continue;
      }

      const reminderOverrides: { method: 'popup'; minutes: number }[] = [];
      if (Array.isArray(b.reminders) && b.reminders.length > 0) {
        for (const rem of b.reminders) {
          if (rem.type === 'offset' && typeof rem.offsetDays === 'number' && rem.offsetDays > 0) {
            const mins = Math.min(rem.offsetDays * 24 * 60, 40320);
            reminderOverrides.push({ method: 'popup', minutes: mins });
          } else if (rem.type === 'custom' && rem.customDateTime) {
            const remTime = new Date(rem.customDateTime).getTime();
            const startTime = new Date(b.startDate).getTime();
            if (remTime < startTime) {
              const diffMins = Math.round((startTime - remTime) / (60 * 1000));
              if (diffMins > 0 && diffMins <= 40320) {
                reminderOverrides.push({ method: 'popup', minutes: diffMins });
              }
            }
          }
        }
      }

      if (reminderOverrides.length === 0) {
        reminderOverrides.push({ method: 'popup', minutes: 7 * 24 * 60 });
        reminderOverrides.push({ method: 'popup', minutes: 1 * 24 * 60 });
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
        end: { date: addDays(b.endDate, 1) },
        reminders: {
          useDefault: false,
          overrides: reminderOverrides.slice(0, 5),
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
          console.error(`[sync-all] Google API Error on Booking ${b.voucherNo || b.id}:`, errText);
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
        const errMsg = err instanceof Error ? err.message : 'Unknown exception';
        console.error(`[sync-all] Exception on Booking ${b.voucherNo || b.id}:`, err);
        errors.push(`Booking ${b.voucherNo || b.id}: ${errMsg}`);
      }
    }

    // If there were API errors and nothing got synced, report the error instead of false success!
    if (errors.length > 0 && syncedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Google Calendar returned an error: ${errors[0]}`,
          errors,
          skippedReason,
        },
        { status: 400 }
      );
    }

    const message = syncedCount > 0
      ? `Successfully synchronized ${syncedCount} itinerary event${syncedCount === 1 ? '' : 's'} directly to your primary Google Calendar!`
      : `All ${itineraries.length} dashboard itineraries are already up to date on your primary Google Calendar (0 duplicates created).`;

    return NextResponse.json({
      success: true,
      syncedCount,
      totalConsidered: itineraries.length + bookings.length,
      syncedBookings,
      syncedItineraries,
      updatedAccessToken,
      tokenExpiresAt,
      errors: errors.length > 0 ? errors : undefined,
      skippedReason: skippedReason.length > 0 ? skippedReason : undefined,
      message,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal calendar sync exception';
    console.error('[sync-all error]:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
