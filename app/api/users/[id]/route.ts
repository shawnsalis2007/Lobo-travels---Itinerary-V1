import { NextRequest, NextResponse } from 'next/server';
import { getDbUserById, saveDbUser, deleteDbUser } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getDbUserById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        brandId: user.brandId,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        permissions: user.permissions,
        mustChangePassword: user.mustChangePassword,
        isActive: user.isActive,
        failedLoginAttempts: user.failedLoginAttempts,
        lockedUntil: user.lockedUntil,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error: any) {
    console.error('API /api/users/[id] GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);
    if (!auth || (auth.user.role !== 'super_admin' && auth.user.role !== 'brand_admin')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin privileges required' }, { status: 403 });
    }

    const targetUser = await getDbUserById(id);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Brand Admin cannot edit users outside their brand
    if (auth.user.role === 'brand_admin' && targetUser.brandId !== auth.user.brandId) {
      return NextResponse.json({ success: false, error: 'Forbidden: Cannot edit users from another brand' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const updated = await saveDbUser({
      ...targetUser,
      brandId: (auth.user.role === 'super_admin' && body.brandId) ? body.brandId : targetUser.brandId,
      fullName: body.fullName !== undefined ? body.fullName : targetUser.fullName,
      role: body.role !== undefined ? body.role : targetUser.role,
      permissions: body.permissions !== undefined ? body.permissions : targetUser.permissions,
      isActive: body.isActive !== undefined ? body.isActive : targetUser.isActive,
      lockedUntil: body.unlock ? null : targetUser.lockedUntil,
      failedLoginAttempts: body.unlock ? 0 : targetUser.failedLoginAttempts
    }, auth.user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        brandId: updated.brandId,
        email: updated.email,
        fullName: updated.fullName,
        role: updated.role,
        permissions: updated.permissions,
        isActive: updated.isActive
      }
    });
  } catch (error: any) {
    console.error('API /api/users/[id] PUT error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);
    if (!auth || (auth.user.role !== 'super_admin' && auth.user.role !== 'brand_admin')) {
      return NextResponse.json({ success: false, error: 'Forbidden: Admin privileges required' }, { status: 403 });
    }

    const targetUser = await getDbUserById(id);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    if (auth.user.id === id) {
      return NextResponse.json({ success: false, error: 'Cannot delete your own account' }, { status: 400 });
    }

    if (auth.user.role === 'brand_admin' && targetUser.brandId !== auth.user.brandId) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await deleteDbUser(id, auth.user.id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/users/[id] DELETE error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete user' }, { status: 500 });
  }
}
