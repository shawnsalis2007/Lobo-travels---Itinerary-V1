import { NextRequest, NextResponse } from 'next/server';
import { getDbDrivers, saveDbDriver, deleteDbDriver, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { Driver } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const auth = await getAuthContext(req);
    const brandId = searchParams.get('brandId') || (auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID);

    const drivers = await getDbDrivers(brandId);
    return NextResponse.json({ success: true, drivers });
  } catch (error: any) {
    console.error('API /api/drivers GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch drivers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const driver = (body.data || body) as Driver;

    if (!driver.name || !driver.phone) {
      return NextResponse.json({ success: false, error: 'Driver name and phone number are required' }, { status: 400 });
    }

    const auth = await getAuthContext(req);
    const brandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : (driver.brandId || DEFAULT_BRAND_ID);

    const saved = await saveDbDriver({
      ...driver,
      brandId
    }, auth?.user.id);

    return NextResponse.json({ success: true, driver: saved });
  } catch (error: any) {
    console.error('API /api/drivers POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to save driver' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Driver ID is required' }, { status: 400 });
    }

    const auth = await getAuthContext(req);
    await deleteDbDriver(id, auth?.user.id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/drivers DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete driver' }, { status: 500 });
  }
}
