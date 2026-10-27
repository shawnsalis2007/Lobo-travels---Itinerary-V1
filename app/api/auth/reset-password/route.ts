import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, hashPassword } from '@/lib/auth';
import { getDbUserById, saveDbUser, logDbActivity } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Only super_admin or brand_admin can reset passwords
    if (auth.user.role !== 'super_admin' && auth.user.role !== 'brand_admin') {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const targetUserId = body.userId;
    const newPassword = body.newPassword || 'Lobo@Change2026!';

    if (!targetUserId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const targetUser = await getDbUserById(targetUserId);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Brand Admin cannot reset users from other brands or Super Admins
    if (auth.user.role === 'brand_admin') {
      if (targetUser.brandId !== auth.user.brandId) {
        return NextResponse.json({ success: false, error: 'Forbidden: Cannot manage users from other brands' }, { status: 403 });
      }
      if (targetUser.role === 'super_admin') {
        return NextResponse.json({ success: false, error: 'Forbidden: Cannot reset Super Admin account' }, { status: 403 });
      }
    }

    const newHash = await hashPassword(newPassword);
    await saveDbUser({
      ...targetUser,
      passwordHash: newHash,
      failedLoginAttempts: 0,
      lockedUntil: null,
      mustChangePassword: true
    }, auth.user.id);

    await logDbActivity({
      brandId: targetUser.brandId,
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: 'reset_user_password',
      entityType: 'user',
      entityId: targetUser.id,
      details: { targetEmail: targetUser.email }
    });

    return NextResponse.json({
      success: true,
      message: `Password reset successfully. The user must change password upon next login. Temporary password: ${newPassword}`
    });
  } catch (error: any) {
    console.error('API /api/auth/reset-password error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to reset password' },
      { status: 500 }
    );
  }
}
