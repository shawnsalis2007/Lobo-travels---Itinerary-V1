import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/auth-api-key';
import { getDbItineraryById, saveDbItinerary, deleteDbItinerary } from '@/lib/db';
import { Itinerary, ItineraryDay } from '@/types';
import { getDayDateISO } from '@/lib/utils';
import { generateAutoDayDescription } from '@/lib/narrative-generator';

export const dynamic = 'force-dynamic';

/**
 * GET /api/external/itineraries/[id]
 * Retrieve full detailed JSON for a specific itinerary by ID, reference number, or voucher number.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { id } = await context.params;
    if (!id || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing itinerary identifier in URL' },
        { status: 400 }
      );
    }

    const itinerary = await getDbItineraryById(id.trim());
    if (!itinerary) {
      return NextResponse.json(
        {
          success: false,
          error: `Itinerary not found for identifier: "${id}" (searched ID, reference number, and voucher number)`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      itinerary
    });
  } catch (error: any) {
    console.error('[API External] GET /api/external/itineraries/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch itinerary' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/external/itineraries/[id]
 * Update an existing itinerary by ID or reference number.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { id } = await context.params;
    if (!id || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing itinerary identifier in URL' },
        { status: 400 }
      );
    }

    const existing = await getDbItineraryById(id.trim());
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot update: Itinerary not found for identifier "${id}"`
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Prepare updated days if provided
    let updatedDays: ItineraryDay[] = existing.days;
    const startDate = body.startDate !== undefined ? body.startDate : existing.startDate;
    const datesNotConfirmed = body.datesNotConfirmed !== undefined ? Boolean(body.datesNotConfirmed) : existing.datesNotConfirmed;

    if (Array.isArray(body.days)) {
      updatedDays = body.days.map((d: any, idx: number) => {
        const dayNum = d.dayNumber || (idx + 1);
        const dest = d.destination?.trim() || existing.days[idx]?.destination || 'Delhi';
        const overnight = d.overnightLocation?.trim() || dest;
        const dayId = d.id || existing.days[idx]?.id || `day-${Date.now()}-${dayNum}`;
        const dayDate = (!datesNotConfirmed && startDate) ? getDayDateISO(startDate, dayNum) : (d.date || undefined);

        const dayObj: ItineraryDay = {
          ...existing.days[idx],
          ...d,
          id: dayId,
          dayNumber: dayNum,
          date: dayDate,
          title: d.title?.trim() || (dayNum === 1 ? `Arrival in ${dest}` : `Day ${dayNum} Sightseeing in ${dest}`),
          destination: dest,
          overnightLocation: overnight,
          attractionIds: Array.isArray(d.attractionIds) ? d.attractionIds : (existing.days[idx]?.attractionIds || []),
          attractionNames: Array.isArray(d.attractionNames) ? d.attractionNames : (existing.days[idx]?.attractionNames || []),
          meals: {
            breakfast: d.meals?.breakfast ?? existing.days[idx]?.meals?.breakfast ?? true,
            lunch: d.meals?.lunch ?? existing.days[idx]?.meals?.lunch ?? false,
            dinner: d.meals?.dinner ?? existing.days[idx]?.meals?.dinner ?? false,
            note: d.meals?.note || existing.days[idx]?.meals?.note || ''
          },
          images: Array.isArray(d.images) ? d.images : (existing.days[idx]?.images || [])
        };

        if (!dayObj.description) {
          dayObj.description = generateAutoDayDescription(dayObj, idx, body.days.length, body.includeHotels !== false);
        }

        return dayObj;
      });
    } else if (startDate !== existing.startDate || datesNotConfirmed !== existing.datesNotConfirmed) {
      // Recalculate day dates based on new startDate
      updatedDays = existing.days.map(d => ({
        ...d,
        date: (!datesNotConfirmed && startDate) ? getDayDateISO(startDate, d.dayNumber) : undefined
      }));
    }

    const daysCount = updatedDays.length;
    const durationText = body.durationText?.trim() || (
      daysCount > 1 ? `${daysCount - 1} Nights / ${daysCount} Days` : '1 Day Sightseeing'
    );

    const totalCost = typeof body.totalCost === 'number' ? body.totalCost : existing.totalCost;
    const advancePaid = typeof body.advancePaid === 'number' ? body.advancePaid : existing.advancePaid;
    const pendingAmount = Math.max(0, totalCost - advancePaid);
    const paymentStatus = advancePaid >= totalCost && totalCost > 0 
      ? 'Paid' 
      : (advancePaid > 0 ? 'Partially Paid' : 'Unpaid');

    const mergedItinerary: Itinerary = {
      ...existing,
      ...body,
      id: existing.id, // Preserve original primary key ID
      referenceNumber: existing.referenceNumber, // Preserve reference number
      voucherReference: existing.voucherReference,
      tourName: body.tourName?.trim() || existing.tourName,
      clientName: body.clientName?.trim() || existing.clientName,
      clientPhone: body.clientPhone !== undefined ? body.clientPhone.trim() : existing.clientPhone,
      clientEmail: body.clientEmail !== undefined ? body.clientEmail.trim() : existing.clientEmail,
      startDate,
      endDate: body.endDate?.trim() || (startDate && daysCount > 1 ? getDayDateISO(startDate, daysCount) : startDate),
      datesNotConfirmed,
      daysCount,
      durationText,
      totalCost,
      advancePaid,
      pendingAmount,
      paymentStatus,
      days: updatedDays,
      updatedAt: now
    };

    const saved = await saveDbItinerary(mergedItinerary);

    return NextResponse.json({
      success: true,
      message: 'Itinerary updated successfully in database',
      itinerary: saved
    });
  } catch (error: any) {
    console.error('[API External] PUT /api/external/itineraries/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update itinerary' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/external/itineraries/[id]
 * Remove an itinerary by ID or reference number.
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { id } = await context.params;
    if (!id || !id.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing itinerary identifier in URL' },
        { status: 400 }
      );
    }

    const existing = await getDbItineraryById(id.trim());
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Itinerary not found for identifier "${id}"` },
        { status: 404 }
      );
    }

    await deleteDbItinerary(id.trim());

    return NextResponse.json({
      success: true,
      message: `Itinerary "${existing.referenceNumber}" (${existing.tourName}) deleted successfully`
    });
  } catch (error: any) {
    console.error('[API External] DELETE /api/external/itineraries/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete itinerary' },
      { status: 500 }
    );
  }
}
