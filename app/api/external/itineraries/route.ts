import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/auth-api-key';
import { getDbItineraries, saveDbItinerary } from '@/lib/db';
import { Itinerary, ItineraryDay } from '@/types';
import { getDayDateISO } from '@/lib/utils';
import { generateAutoDayDescription } from '@/lib/narrative-generator';

export const dynamic = 'force-dynamic';

/**
 * GET /api/external/itineraries
 * Fetches all itineraries stored in the database.
 * Supports pagination (limit, offset) and full-text search across titles, clients, and references.
 */
export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase().trim();
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10), 1), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);

    const allItineraries = await getDbItineraries();

    let filtered = allItineraries;
    if (search) {
      filtered = filtered.filter(itn => {
        const titleMatch = (itn.tourName || '').toLowerCase().includes(search);
        const clientMatch = (itn.clientName || '').toLowerCase().includes(search);
        const refMatch = (itn.referenceNumber || '').toLowerCase().includes(search);
        const destMatch = (itn.days || []).some(d => (d.destination || '').toLowerCase().includes(search));
        return titleMatch || clientMatch || refMatch || destMatch;
      });
    }

    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      total: filtered.length,
      count: paginated.length,
      limit,
      offset,
      itineraries: paginated
    });
  } catch (error: any) {
    console.error('[API External] GET /api/external/itineraries error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch itineraries' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/external/itineraries
 * Push / create a new itinerary programmatically with a full structured day-by-day JSON payload.
 */
export async function POST(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    if (!body.tourName || typeof body.tourName !== 'string' || !body.tourName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: "tourName" (string)' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const currentYear = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);

    const id = body.id?.trim() || ('itn-ext-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));
    const referenceNumber = body.referenceNumber?.trim() || `LT-${currentYear}-${randomSeq}`;
    const voucherReference = referenceNumber.startsWith('LT-') 
      ? referenceNumber.replace(/^LT-/, 'LTV-') 
      : `LTV-${referenceNumber}`;

    const rawDays: any[] = Array.isArray(body.days) && body.days.length > 0 
      ? body.days 
      : [{
          dayNumber: 1,
          destination: 'Delhi',
          title: 'Arrival in Delhi & Orientation',
          overnightLocation: 'Delhi'
        }];

    const startDate = body.startDate?.trim() || '';
    const datesNotConfirmed = body.datesNotConfirmed !== undefined ? Boolean(body.datesNotConfirmed) : !startDate;

    // Sanitize and structure each day
    const sanitizedDays: ItineraryDay[] = rawDays.map((d: any, idx: number) => {
      const dayNum = d.dayNumber || (idx + 1);
      const dest = d.destination?.trim() || 'Delhi';
      const overnight = d.overnightLocation?.trim() || dest;
      const dayId = d.id || `day-${Date.now()}-${dayNum}`;
      const dayDate = (!datesNotConfirmed && startDate) ? getDayDateISO(startDate, dayNum) : (d.date || undefined);

      const dayObj: ItineraryDay = {
        id: dayId,
        dayNumber: dayNum,
        date: dayDate,
        title: d.title?.trim() || (dayNum === 1 ? `Arrival in ${dest}` : `Day ${dayNum} Sightseeing in ${dest}`),
        destination: dest,
        attractionIds: Array.isArray(d.attractionIds) ? d.attractionIds : [],
        attractionNames: Array.isArray(d.attractionNames) ? d.attractionNames : [],
        description: d.description?.trim() || '',
        isOvernightSameLocation: d.isOvernightSameLocation !== undefined ? Boolean(d.isOvernightSameLocation) : true,
        overnightLocation: overnight,
        meals: {
          breakfast: d.meals?.breakfast ?? true,
          lunch: d.meals?.lunch ?? false,
          dinner: d.meals?.dinner ?? false,
          note: d.meals?.note || ''
        },
        images: Array.isArray(d.images) ? d.images : [],
        notes: d.notes || '',
        transfer: d.transfer,
        hotel: d.hotel,
        hotelTiers: d.hotelTiers,
        excludeHotel: Boolean(d.excludeHotel),
        arrivalDetails: d.arrivalDetails,
        departureDetails: d.departureDetails,
        isMultiCity: Boolean(d.isMultiCity),
        cities: d.cities
      };

      // Auto-generate narrative description if left blank
      if (!dayObj.description) {
        dayObj.description = generateAutoDayDescription(dayObj, idx, rawDays.length, body.includeHotels !== false);
      }

      return dayObj;
    });

    const daysCount = sanitizedDays.length;
    const nights = Math.max(0, daysCount - 1);
    const durationText = body.durationText?.trim() || (
      daysCount > 1 ? `${nights} Nights / ${daysCount} Days` : '1 Day Sightseeing'
    );

    const adults = typeof body.adults === 'number' ? body.adults : 2;
    const children = typeof body.children === 'number' ? body.children : 0;
    const totalPax = adults + children;

    const totalCost = typeof body.totalCost === 'number' ? body.totalCost : 0;
    const advancePaid = typeof body.advancePaid === 'number' ? body.advancePaid : 0;
    const pendingAmount = Math.max(0, totalCost - advancePaid);
    const paymentStatus = advancePaid >= totalCost && totalCost > 0 
      ? 'Paid' 
      : (advancePaid > 0 ? 'Partially Paid' : 'Unpaid');

    const newItinerary: Itinerary = {
      id,
      referenceNumber,
      voucherReference,
      tourName: body.tourName.trim(),
      clientName: body.clientName?.trim() || 'Valued Guest',
      clientPhone: body.clientPhone?.trim() || '',
      clientEmail: body.clientEmail?.trim() || '',
      adults,
      children,
      childrenDetails: Array.isArray(body.childrenDetails) ? body.childrenDetails : [],
      totalPax,
      paxSummary: body.paxSummary?.trim() || (children > 0 ? `${adults} Adults, ${children} Children` : `${adults} Adults`),
      startDate,
      endDate: body.endDate?.trim() || (startDate && daysCount > 1 ? getDayDateISO(startDate, daysCount) : startDate),
      datesNotConfirmed,
      daysCount,
      nights,
      durationText,
      totalCost,
      advancePaid,
      pendingAmount,
      paymentStatus,
      showCostInItinerary: body.showCostInItinerary !== undefined ? Boolean(body.showCostInItinerary) : true,
      costDisplayType: body.costDisplayType || 'total',
      currency: body.currency || 'INR',
      currencySymbol: body.currencySymbol || '₹',
      costBreakdown: body.costBreakdown || {
        vehicleCost: body.transportRate || 0,
        driverAllowance: 0,
        fuelCost: 0,
        tollTaxes: 0,
        stateTaxes: 0,
        parkingCharges: 0,
        hotelCost: body.accommodationRate || 0,
        otherCost: 0,
        marginPercentage: 0,
        totalCalculated: totalCost
      },
      transportRate: body.transportRate || 0,
      accommodationRate: body.accommodationRate || 0,
      vehicleBrand: body.vehicleBrand || 'Kia',
      vehicleModel: body.vehicleModel || 'Carens',
      vehicleCategory: body.vehicleCategory || 'MUV',
      vehicleDisplay: body.vehicleDisplay?.trim() || 'Kia Carens – Private Air-Conditioned Vehicle',
      includeHotels: body.includeHotels !== false,
      hotelTiersEnabled: Boolean(body.hotelTiersEnabled),
      selectedHotelTier: body.selectedHotelTier || '4_star',
      pricingTiers: body.pricingTiers,
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      days: sanitizedDays,
      status: body.status || 'Active',
      createdAt: body.createdAt || now,
      updatedAt: now,
      specialNotes: body.specialNotes || body.specialInstructions || '',
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [
        'Dedicated Private Air-Conditioned Vehicle for entire tour',
        'Fuel charges, toll taxes, state road taxes & parking charges',
        'Daily breakfast at partner hotels (CP Plan)',
        'Professional Chauffeur service for all transfers & sightseeing'
      ],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [
        'Monument entry tickets and guide fees',
        'Personal expenses such as laundry, phone calls & tips',
        'Airfare / Train tickets unless explicitly included',
        'Any item not mentioned in inclusions'
      ]
    };

    const saved = await saveDbItinerary(newItinerary);

    return NextResponse.json(
      {
        success: true,
        message: 'Itinerary created successfully in database',
        itinerary: saved
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API External] POST /api/external/itineraries error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create itinerary' },
      { status: 500 }
    );
  }
}
