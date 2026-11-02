import { NextRequest, NextResponse } from 'next/server';
import { getDbFleet, saveDbFleetVehicle, deleteDbFleetVehicle, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { FleetVehicle } from '@/types';

export const dynamic = 'force-dynamic';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0'
};

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const auth = await getAuthContext(req);
    const brandId = searchParams.get('brandId') || (auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID);

    const fleet = await getDbFleet(brandId);
    return NextResponse.json({ success: true, fleet }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    console.error('API /api/fleet GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch fleet' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const vehicle = (body.data || body) as FleetVehicle;

    if (!vehicle.plateNumber && !vehicle.registrationNumber) {
      return NextResponse.json({ success: false, error: 'Registration plate number is required' }, { status: 400 });
    }

    const auth = await getAuthContext(req);
    const brandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : (vehicle.brandId || DEFAULT_BRAND_ID);

    const saved = await saveDbFleetVehicle({
      ...vehicle,
      brandId
    }, auth?.user.id);

    return NextResponse.json({ success: true, vehicle: saved }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    console.error('API /api/fleet POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to save vehicle' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Vehicle ID is required' }, { status: 400 });
    }

    const auth = await getAuthContext(req);
    await deleteDbFleetVehicle(id, auth?.user.id);
    return NextResponse.json({ success: true, id }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    console.error('API /api/fleet DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete vehicle' }, { status: 500 });
  }
}
