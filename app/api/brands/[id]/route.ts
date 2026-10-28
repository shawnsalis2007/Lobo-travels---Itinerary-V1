import { NextRequest, NextResponse } from 'next/server';
import { getDbBrandById, saveDbBrand, deleteDbBrand, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { Brand } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const brand = await getDbBrandById(id);
    if (!brand) {
      return NextResponse.json({ success: false, error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, brand });
  } catch (error: any) {
    console.error('API /api/brands/[id] GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch brand' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);
    if (!auth || (auth.user.role !== 'super_admin' && (auth.user.role !== 'brand_admin' || auth.user.brandId !== id))) {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient privileges to update brand' }, { status: 403 });
    }

    const existing = await getDbBrandById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Brand not found' }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const updated: Brand = {
      ...existing,
      ...body,
      id: existing.id, // prevent id mutation
      updatedAt: new Date().toISOString()
    };

    const saved = await saveDbBrand(updated, auth.user.id);
    return NextResponse.json({ success: true, brand: saved });
  } catch (error: any) {
    console.error('API /api/brands/[id] PUT error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update brand' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);
    if (!auth || auth.user.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Forbidden: Only Super Admin can delete brands' }, { status: 403 });
    }

    if (id === DEFAULT_BRAND_ID) {
      return NextResponse.json({ success: false, error: "The primary Lobo's Travel Wizard brand cannot be deleted" }, { status: 400 });
    }

    await deleteDbBrand(id, auth.user.id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/brands/[id] DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete brand' }, { status: 500 });
  }
}
