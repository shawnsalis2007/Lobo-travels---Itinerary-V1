import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbDestinations, 
  saveDbDestination, 
  deleteDbDestination,
  getDbAttractions,
  saveDbAttraction,
  deleteDbAttraction,
  getActiveDbProvider 
} from '@/lib/db';
import { Destination, Attraction } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const dbInfo = getActiveDbProvider();

    if (type === 'destination' || type === 'destinations') {
      const destinations = await getDbDestinations();
      return NextResponse.json({ success: true, destinations, provider: dbInfo.label });
    }

    if (type === 'attraction' || type === 'attractions') {
      const attractions = await getDbAttractions();
      return NextResponse.json({ success: true, attractions, provider: dbInfo.label });
    }

    const [destinations, attractions] = await Promise.all([
      getDbDestinations(),
      getDbAttractions()
    ]);

    return NextResponse.json({
      success: true,
      destinations,
      attractions,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/destinations GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dbInfo = getActiveDbProvider();

    // Differentiate between attraction and destination
    if (body.type === 'attraction' || body.destinationId) {
      const attractionData = (body.data || body) as Attraction;
      if (!attractionData.name || !attractionData.destinationId) {
        return NextResponse.json(
          { success: false, error: 'Attraction name and destinationId are required' },
          { status: 400 }
        );
      }
      const saved = await saveDbAttraction(attractionData);
      return NextResponse.json({ success: true, item: saved, type: 'attraction', provider: dbInfo.label });
    }

    // Default: destination
    const destData = (body.data || body) as Destination;
    if (!destData.name || !destData.id) {
      return NextResponse.json(
        { success: false, error: 'Destination name and id are required' },
        { status: 400 }
      );
    }

    const saved = await saveDbDestination(destData);
    return NextResponse.json({ success: true, item: saved, type: 'destination', provider: dbInfo.label });
  } catch (error: any) {
    console.error('API /api/destinations POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save destination' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');
    let type = searchParams.get('type') || 'destination';

    if (!id) {
      try {
        const body = await req.json();
        if (body?.id) id = body.id;
        if (body?.type) type = body.type;
      } catch (_) {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item id is required for deletion' },
        { status: 400 }
      );
    }

    if (type === 'attraction') {
      await deleteDbAttraction(id);
      return NextResponse.json({ success: true, id, type: 'attraction' });
    }

    await deleteDbDestination(id);
    return NextResponse.json({ success: true, id, type: 'destination' });
  } catch (error: any) {
    console.error('API /api/destinations DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete destination' },
      { status: 500 }
    );
  }
}
