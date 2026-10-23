import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/auth-api-key';
import { 
  getDbDestinations, 
  saveDbDestination, 
  getDbAttractions, 
  saveDbAttraction, 
  getDbHotels, 
  saveDbHotel,
  getActiveDbProvider
} from '@/lib/db';
import { Destination, Attraction, Hotel } from '@/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/external/catalog
 * Pull available destinations, sights (attractions), and partner hotels stored in Neon Postgres.
 * Supports filtering by ?type=all|destinations|attractions|hotels and ?destination=city_name
 */
export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = (searchParams.get('type') || 'all').toLowerCase();
    const destinationFilter = searchParams.get('destination')?.toLowerCase().trim();
    const dbInfo = getActiveDbProvider();

    let destinations: Destination[] = [];
    let attractions: Attraction[] = [];
    let hotels: Hotel[] = [];

    if (type === 'all' || type === 'destinations' || type === 'destination') {
      destinations = await getDbDestinations();
      if (destinationFilter) {
        destinations = destinations.filter(d => 
          (d.name || '').toLowerCase().includes(destinationFilter) ||
          (d.id || '').toLowerCase().includes(destinationFilter)
        );
      }
    }

    if (type === 'all' || type === 'attractions' || type === 'sights' || type === 'attraction') {
      attractions = await getDbAttractions();
      if (destinationFilter) {
        attractions = attractions.filter(a => 
          (a.destinationName || '').toLowerCase().includes(destinationFilter) ||
          (a.destinationId || '').toLowerCase().includes(destinationFilter)
        );
      }
    }

    if (type === 'all' || type === 'hotels' || type === 'hotel') {
      hotels = await getDbHotels();
      if (destinationFilter) {
        hotels = hotels.filter(h => 
          (h.city || '').toLowerCase().includes(destinationFilter)
        );
      }
    }

    return NextResponse.json({
      success: true,
      provider: dbInfo.label,
      counts: {
        destinations: destinations.length,
        attractions: attractions.length,
        hotels: hotels.length
      },
      destinations: type === 'all' || type.startsWith('dest') ? destinations : undefined,
      attractions: type === 'all' || type.startsWith('attr') || type === 'sights' ? attractions : undefined,
      hotels: type === 'all' || type.startsWith('hot') ? hotels : undefined
    });
  } catch (error: any) {
    console.error('[API External] GET /api/external/catalog error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/external/catalog
 * Push new destinations or hotel entries (or sights/attractions) into the Neon database.
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

    const created = {
      destinations: [] as Destination[],
      hotels: [] as Hotel[],
      attractions: [] as Attraction[]
    };

    // Helper: generate URL-friendly slug ID
    const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Case 1: Bulk arrays provided
    if (Array.isArray(body.destinations)) {
      for (const d of body.destinations) {
        if (d.name) {
          const destId = d.id?.trim() || slugify(d.name);
          const saved = await saveDbDestination({
            ...d,
            id: destId,
            name: d.name.trim(),
            state: d.state || '',
            country: d.country || 'India',
            gallery: Array.isArray(d.gallery) ? d.gallery : (d.heroImage ? [d.heroImage] : [])
          });
          created.destinations.push(saved);
        }
      }
    }

    if (Array.isArray(body.hotels)) {
      for (const h of body.hotels) {
        if (h.name && h.city) {
          const hotelId = h.id?.trim() || slugify(`${h.city}-${h.name}`);
          const saved = await saveDbHotel({
            ...h,
            id: hotelId,
            name: h.name.trim(),
            city: h.city.trim(),
            starCategory: h.starCategory || 4,
            gallery: Array.isArray(h.gallery) ? h.gallery : (h.image ? [h.image] : [])
          });
          created.hotels.push(saved);
        }
      }
    }

    if (Array.isArray(body.attractions)) {
      for (const a of body.attractions) {
        if (a.name && (a.destinationId || a.destinationName)) {
          const destId = a.destinationId ? a.destinationId.toLowerCase().trim() : slugify(a.destinationName);
          const attId = a.id?.trim() || slugify(`${destId}-${a.name}`);
          const saved = await saveDbAttraction({
            ...a,
            id: attId,
            destinationId: destId,
            destinationName: a.destinationName || destId,
            name: a.name.trim()
          });
          created.attractions.push(saved);
        }
      }
    }

    // Case 2: Single item with explicit type or single object payload
    const itemType = (body.type || '').toLowerCase();

    if (itemType === 'destination' || body.destination) {
      const d = body.destination || body;
      if (!d.name || typeof d.name !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Destination requires a "name" string' },
          { status: 400 }
        );
      }
      const destId = d.id?.trim() || slugify(d.name);
      const saved = await saveDbDestination({
        ...d,
        id: destId,
        name: d.name.trim(),
        state: d.state || '',
        country: d.country || 'India',
        gallery: Array.isArray(d.gallery) ? d.gallery : (d.heroImage ? [d.heroImage] : [])
      });
      created.destinations.push(saved);
    } else if (itemType === 'hotel' || body.hotel) {
      const h = body.hotel || body;
      if (!h.name || !h.city) {
        return NextResponse.json(
          { success: false, error: 'Hotel requires "name" and "city" strings' },
          { status: 400 }
        );
      }
      const hotelId = h.id?.trim() || slugify(`${h.city}-${h.name}`);
      const saved = await saveDbHotel({
        ...h,
        id: hotelId,
        name: h.name.trim(),
        city: h.city.trim(),
        starCategory: h.starCategory || 4,
        gallery: Array.isArray(h.gallery) ? h.gallery : (h.image ? [h.image] : [])
      });
      created.hotels.push(saved);
    } else if (itemType === 'attraction' || itemType === 'sight' || body.attraction) {
      const a = body.attraction || body;
      if (!a.name || (!a.destinationId && !a.destinationName)) {
        return NextResponse.json(
          { success: false, error: 'Attraction requires "name" and "destinationId" (or "destinationName")' },
          { status: 400 }
        );
      }
      const destId = a.destinationId ? a.destinationId.toLowerCase().trim() : slugify(a.destinationName);
      const attId = a.id?.trim() || slugify(`${destId}-${a.name}`);
      const saved = await saveDbAttraction({
        ...a,
        id: attId,
        destinationId: destId,
        destinationName: a.destinationName || destId,
        name: a.name.trim()
      });
      created.attractions.push(saved);
    }

    const totalCreated = created.destinations.length + created.hotels.length + created.attractions.length;

    if (totalCreated === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid catalog items found in payload. Provide a "type" ("destination" | "hotel" | "attraction") with item properties, or arrays "destinations" / "hotels" / "attractions".'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully processed ${totalCreated} catalog item(s) in Neon database`,
        counts: {
          destinations: created.destinations.length,
          hotels: created.hotels.length,
          attractions: created.attractions.length
        },
        data: created
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API External] POST /api/external/catalog error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to push catalog data' },
      { status: 500 }
    );
  }
}
