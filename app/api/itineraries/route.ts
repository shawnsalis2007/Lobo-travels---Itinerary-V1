import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbItineraries, 
  saveDbItinerary, 
  deleteDbItinerary, 
  getActiveDbProvider,
  getDbItineraryById,
  ensurePostgresTables,
  DEFAULT_BRAND_ID
} from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { Itinerary } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase();
    const includeDeleted = searchParams.get('includeDeleted') === 'true';
    const reqBrandId = searchParams.get('brandId');
    const dbInfo = getActiveDbProvider();

    // Authenticate context if available
    const auth = await getAuthContext(req);
    let targetBrandId: string | undefined = undefined;

    if (auth) {
      if (auth.user.role === 'super_admin') {
        targetBrandId = reqBrandId || (auth.isViewingAs ? auth.activeBrandId : undefined);
      } else {
        targetBrandId = auth.user.brandId;
      }
    } else if (reqBrandId) {
      targetBrandId = reqBrandId;
    }

    const itineraries = await getDbItineraries(targetBrandId, includeDeleted);

    let result = itineraries;
    if (search) {
      result = itineraries.filter(i => 
        (i.tourName || '').toLowerCase().includes(search) ||
        (i.clientName || '').toLowerCase().includes(search) ||
        (i.referenceNumber || '').toLowerCase().includes(search) ||
        (i.id || '').toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      itineraries: result,
      count: result.length,
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
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const itinerary = (body.data || body) as Itinerary;
    const expectedVersion = typeof body.expectedVersion === 'number' ? body.expectedVersion : itinerary.version;

    if (!itinerary.tourName) {
      return NextResponse.json(
        { success: false, error: 'Tour name is required' },
        { status: 400 }
      );
    }

    const auth = await getAuthContext(req);
    const activeBrandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : (itinerary.brandId || DEFAULT_BRAND_ID);

    // Permission check if authenticated
    if (auth && auth.user.role !== 'super_admin' && auth.user.role !== 'brand_admin') {
      const isExisting = !!itinerary.id && !!(await getDbItineraryById(itinerary.id));
      if (isExisting && !auth.user.permissions?.canEditItinerary && !auth.user.permissions?.itineraries_edit) {
        return NextResponse.json({ success: false, error: 'Forbidden: You do not have permission to edit itineraries' }, { status: 403 });
      }
      if (!isExisting && !auth.user.permissions?.canCreateItinerary && !auth.user.permissions?.itineraries_create) {
        return NextResponse.json({ success: false, error: 'Forbidden: You do not have permission to create itineraries' }, { status: 403 });
      }
    }

    const saveResult = await saveDbItinerary(itinerary, {
      expectedVersion,
      userId: auth?.user.id,
      userEmail: auth?.user.email,
      brandId: activeBrandId
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

    if (!saveResult.success || !saveResult.itinerary) {
      return NextResponse.json(
        { success: false, error: saveResult.error || 'Failed to save itinerary' },
        { status: 500 }
      );
    }

    const dbInfo = getActiveDbProvider();
    return NextResponse.json({
      success: true,
      itinerary: saveResult.itinerary,
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
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const hardDelete = searchParams.get('hardDelete') === 'true';

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Itinerary ID or reference is required' },
        { status: 400 }
      );
    }

    const auth = await getAuthContext(req);
    const isSuperAdmin = auth?.user.role === 'super_admin';

    // Permission check
    if (auth && !isSuperAdmin && auth.user.role !== 'brand_admin') {
      if (!auth.user.permissions?.canDeleteItinerary && !auth.user.permissions?.itineraries_delete) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: You do not have permission to delete itineraries' },
          { status: 403 }
        );
      }
    }

    const deleteResult = await deleteDbItinerary(id, {
      hardDelete,
      isSuperAdmin,
      userId: auth?.user.id,
      userEmail: auth?.user.email
    });

    if (!deleteResult.success) {
      if (deleteResult.isProtected) {
        return NextResponse.json(
          { success: false, isProtected: true, error: deleteResult.error },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { success: false, error: deleteResult.error || 'Failed to delete itinerary' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      id, 
      mode: hardDelete && isSuperAdmin ? 'hard_deleted' : 'soft_deleted' 
    });
  } catch (error: any) {
    console.error('API /api/itineraries DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete itinerary' },
      { status: 500 }
    );
  }
}
