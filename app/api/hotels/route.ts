import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbHotels, 
  saveDbHotel, 
  deleteDbHotel, 
  getActiveDbProvider 
} from '@/lib/db';
import { Hotel } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const dbInfo = getActiveDbProvider();

    let hotels = await getDbHotels();
    if (city && city !== 'all') {
      hotels = hotels.filter(h => h.city.toLowerCase() === city.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      hotels,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/hotels GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hotel = (body.data || body) as Hotel;

    if (!hotel.name || !hotel.id) {
      return NextResponse.json(
        { success: false, error: 'Hotel name and id are required' },
        { status: 400 }
      );
    }

    const saved = await saveDbHotel(hotel);
    const dbInfo = getActiveDbProvider();

    return NextResponse.json({
      success: true,
      hotel: saved,
      provider: dbInfo.label
    });
  } catch (error: any) {
    console.error('API /api/hotels POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save hotel' },
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
        { success: false, error: 'Hotel id is required for deletion' },
        { status: 400 }
      );
    }

    await deleteDbHotel(id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/hotels DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete hotel' },
      { status: 500 }
    );
  }
}
