import { NextRequest, NextResponse } from 'next/server';
import { getDbBrands, saveDbBrand, preloadBrandDestinations, ensurePostgresTables, DEFAULT_BRAND } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { Brand } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const brands = await getDbBrands();
    return NextResponse.json({ success: true, brands });
  } catch (error: any) {
    console.error('API /api/brands GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch brands' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const auth = await getAuthContext(req);
    if (!auth || auth.user.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Forbidden: Super Admin privileges required to create brands' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const brand = body as Partial<Brand> & { preloadLoboDestinations?: boolean };

    if (!brand.name) {
      return NextResponse.json({ success: false, error: 'Brand name is required' }, { status: 400 });
    }

    const code = (brand.code || brand.name.substring(0, 4)).toUpperCase();
    const slug = brand.slug || brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const id = brand.id || ('brand-' + slug);

    const newBrand: Brand = {
      id,
      name: brand.name,
      slug,
      code,
      logoUrl: brand.logoUrl || '',
      brandColorPrimary: brand.brandColorPrimary || '#151521',
      brandColorSecondary: brand.brandColorSecondary || '#26214F',
      brandColorAccent: brand.brandColorAccent || '#f59e0b',
      brochureColors: brand.brochureColors || {
        headerBg: brand.brandColorPrimary || '#151521',
        headerText: '#ffffff',
        accentPill: brand.brandColorAccent || '#f59e0b'
      },
      contactInfo: brand.contactInfo || {
        phones: [],
        email: '',
        address: ''
      },
      referencePrefix: brand.referencePrefix || `${code}-2026-`,
      maxUsers: brand.maxUsers || 10,
      status: brand.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = await saveDbBrand(newBrand, auth.user.id);

    // Preload Lobo destinations if requested
    let preloadStats = { destinationsCount: 0, attractionsCount: 0 };
    if (brand.preloadLoboDestinations !== false) {
      preloadStats = await preloadBrandDestinations(saved.id, true);
    }

    return NextResponse.json({
      success: true,
      brand: saved,
      preloadStats
    });
  } catch (error: any) {
    console.error('API /api/brands POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to create brand' }, { status: 500 });
  }
}
