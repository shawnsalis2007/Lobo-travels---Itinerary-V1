import { NextRequest, NextResponse } from 'next/server';
import { getDbItineraryById, saveDbItinerary, deleteDbItinerary } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { Itinerary } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itinerary = await getDbItineraryById(id);
    if (!itinerary) {
      return NextResponse.json({ success: false, error: 'Itinerary not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, itinerary });
  } catch (error: any) {
    console.error('API /api/itineraries/[id] GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch itinerary' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const itinerary = (body.data || body) as Itinerary;
    const expectedVersion = typeof body.expectedVersion === 'number' ? body.expectedVersion : itinerary.version;

    const auth = await getAuthContext(req);
    const saveResult = await saveDbItinerary({
      ...itinerary,
      id: itinerary.id || id
    }, {
      expectedVersion,
      userId: auth?.user.id,
      userEmail: auth?.user.email,
      brandId: auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : itinerary.brandId
    });

    if (saveResult.conflict) {
      return NextResponse.json(
        {
          success: false,
          conflict: true,
          error: saveResult.error,
          currentItinerary: saveResult.currentItinerary
        },
        { status: 409 }
      );
    }

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, itinerary: saveResult.itinerary });
  } catch (error: any) {
    console.error('API /api/itineraries/[id] PUT error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update itinerary' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const hardDelete = searchParams.get('hardDelete') === 'true';

    const auth = await getAuthContext(req);
    const isSuperAdmin = auth?.user.role === 'super_admin';

    const result = await deleteDbItinerary(id, {
      hardDelete,
      isSuperAdmin,
      userId: auth?.user.id,
      userEmail: auth?.user.email
    });

    if (!result.success) {
      return NextResponse.json({ success: false, isProtected: result.isProtected, error: result.error }, { status: 403 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/itineraries/[id] DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete itinerary' }, { status: 500 });
  }
}
