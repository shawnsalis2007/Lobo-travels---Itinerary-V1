import { NextRequest, NextResponse } from 'next/server';
import { getDbItineraries, saveDbItinerary, deleteDbItinerary, getActiveDbProvider } from '@/lib/db';
import { Itinerary } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase();
    const dbInfo = getActiveDbProvider();

    const itineraries = await getDbItineraries();

    let result = itineraries;
    if (search) {
      result = itineraries.filter(i => 
        (i.tourName || '').toLowerCase().includes(search) ||
        (i.clientName || '').toLowerCase().includes(search) ||
        (i.referenceNumber || '').toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      itineraries: result,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/itineraries GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch itineraries' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const itinerary = (body.data || body) as Itinerary;

    if (!itinerary.tourName) {
      return NextResponse.json(
        { success: false, error: 'Tour name is required' },
        { status: 400 }
      );
    }

    const saved = await saveDbItinerary(itinerary);
    const dbInfo = getActiveDbProvider();

    return NextResponse.json({
      success: true,
      itinerary: saved,
      provider: dbInfo.label
    });
  } catch (error: any) {
    console.error('API /api/itineraries POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save itinerary' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Itinerary ID or reference is required' },
        { status: 400 }
      );
    }

    await deleteDbItinerary(id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/itineraries DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete itinerary' },
      { status: 500 }
    );
  }
}
