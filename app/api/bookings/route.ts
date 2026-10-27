import { NextRequest, NextResponse } from 'next/server';
import { getDbBookings, saveDbBooking, deleteDbBooking, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { OperationalBooking } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const auth = await getAuthContext(req);
    const brandId = searchParams.get('brandId') || (auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID);

    const bookings = await getDbBookings(brandId);
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    console.error('API /api/bookings GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const booking = (body.data || body) as OperationalBooking;

    const auth = await getAuthContext(req);
    const brandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : (booking.brandId || DEFAULT_BRAND_ID);

    const saved = await saveDbBooking({
      ...booking,
      brandId
    }, auth?.user.id);

    return NextResponse.json({ success: true, booking: saved });
  } catch (error: any) {
    console.error('API /api/bookings POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to save booking' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 });
    }

    const auth = await getAuthContext(req);
    await deleteDbBooking(id, auth?.user.id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/bookings DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete booking' }, { status: 500 });
  }
}
