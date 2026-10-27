import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { ensurePostgresTables, getDbBrands } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const auth = await getAuthContext(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, authenticated: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const safeUser = {
      id: auth.user.id,
      brandId: auth.user.brandId,
      email: auth.user.email,
      fullName: auth.user.fullName,
      role: auth.user.role,
      permissions: auth.user.permissions,
      mustChangePassword: auth.user.mustChangePassword,
      isActive: auth.user.isActive,
      createdAt: auth.user.createdAt,
      updatedAt: auth.user.updatedAt
    };

    let availableBrands = undefined;
    if (auth.user.role === 'super_admin') {
      availableBrands = await getDbBrands();
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: safeUser,
      brand: auth.brand,
      activeBrandId: auth.activeBrandId,
      isViewingAs: auth.isViewingAs,
      viewingAsBrand: auth.viewingAsBrand,
      availableBrands
    });
  } catch (error: any) {
    console.error('API /api/auth/me error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to authenticate user' },
      { status: 500 }
    );
  }
}
