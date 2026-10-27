import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { getDbBrandById, DEFAULT_BRAND_ID } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth || auth.user.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Forbidden: Super Admin only' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const targetBrandId = body.brandId || DEFAULT_BRAND_ID;

    const brand = await getDbBrandById(targetBrandId);
    if (!brand) {
      return NextResponse.json({ success: false, error: 'Brand not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      activeBrandId: brand.id,
      brand,
      isViewingAs: brand.id !== DEFAULT_BRAND_ID
    });
  } catch (error: any) {
    console.error('API /api/brands/view-as error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to switch brand view' }, { status: 500 });
  }
}
