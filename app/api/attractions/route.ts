import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbAttractions, 
  saveDbAttraction, 
  deleteDbAttraction,
  getActiveDbProvider 
} from '@/lib/db';
import { Attraction } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destinationId = searchParams.get('destinationId');
    const dbInfo = getActiveDbProvider();

    let attractions = await getDbAttractions();
    if (destinationId) {
      attractions = attractions.filter(
        a => a.destinationId?.toLowerCase() === destinationId.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      attractions,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/attractions GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch attractions' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const attraction = (body.data || body) as Attraction;

    if (!attraction.name || !attraction.destinationId) {
      return NextResponse.json(
        { success: false, error: 'Attraction name and destinationId are required' },
        { status: 400 }
      );
    }

    const saved = await saveDbAttraction(attraction);
    const dbInfo = getActiveDbProvider();

    return NextResponse.json({
      success: true,
      attraction: saved,
      provider: dbInfo.label
    });
  } catch (error: any) {
    console.error('API /api/attractions POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save attraction' },
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
        { success: false, error: 'Attraction id is required' },
        { status: 400 }
      );
    }

    await deleteDbAttraction(id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/attractions DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete attraction' },
      { status: 500 }
    );
  }
}
