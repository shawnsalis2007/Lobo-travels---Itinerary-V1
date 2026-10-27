import { NextRequest, NextResponse } from 'next/server';
import { getDbUsers, saveDbUser, getDbBrandById, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext, hashPassword } from '@/lib/auth';
import { User, DEFAULT_PERMISSIONS } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const auth = await getAuthContext(req);

    let brandId: string | undefined = undefined;
    if (auth?.user.role === 'super_admin') {
      brandId = searchParams.get('brandId') || (auth.isViewingAs ? auth.activeBrandId : undefined);
    } else if (auth) {
      brandId = auth.user.brandId;
    } else {
      brandId = searchParams.get('brandId') || DEFAULT_BRAND_ID;
    }

    const users = await getDbUsers(brandId);
    const safeUsers = users.map(u => ({
      id: u.id,
      brandId: u.brandId,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      permissions: u.permissions,
      mustChangePassword: u.mustChangePassword,
      isActive: u.isActive,
      failedLoginAttempts: u.failedLoginAttempts,
      lockedUntil: u.lockedUntil,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }));

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error: any) {
    console.error('API /api/users GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const auth = await getAuthContext(req);
    if (!auth || (auth.user.role !== 'super_admin' && auth.user.role !== 'brand_admin')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin privileges required to manage users' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    const fullName = (body.fullName || '').trim();
    const initialPassword = body.password || 'Lobo@2026!';
    const role = body.role || 'operator';
    const permissions = body.permissions || DEFAULT_PERMISSIONS;

    if (!email || !fullName) {
      return NextResponse.json({ success: false, error: 'Email and full name are required' }, { status: 400 });
    }

    const targetBrandId = auth.user.role === 'super_admin' ? (body.brandId || auth.activeBrandId || DEFAULT_BRAND_ID) : auth.user.brandId;

    // Check user seat limit for brand
    const brand = await getDbBrandById(targetBrandId);
    const existingUsers = await getDbUsers(targetBrandId);
    const maxUsers = brand?.maxUsers || 10;
    if (existingUsers.length >= maxUsers) {
      return NextResponse.json(
        { success: false, error: `User limit reached for brand (${existingUsers.length}/${maxUsers} seats used)` },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(initialPassword);

    const saved = await saveDbUser({
      brandId: targetBrandId,
      email,
      fullName,
      passwordHash,
      role,
      permissions,
      isActive: true,
      mustChangePassword: true
    }, auth.user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: saved.id,
        brandId: saved.brandId,
        email: saved.email,
        fullName: saved.fullName,
        role: saved.role,
        permissions: saved.permissions,
        isActive: saved.isActive,
        mustChangePassword: saved.mustChangePassword
      }
    });
  } catch (error: any) {
    console.error('API /api/users POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to create user' }, { status: 500 });
  }
}
