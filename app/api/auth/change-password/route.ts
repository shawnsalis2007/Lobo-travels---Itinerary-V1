import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, hashPassword, verifyPassword } from '@/lib/auth';
import { getDbUserById, saveDbUser, logDbActivity } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const currentPassword = body.currentPassword || '';
    const newPassword = body.newPassword || '';

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const user = await getDbUserById(auth.user.id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // If current password provided, verify it (unless user was forced to change password)
    if (currentPassword && user.passwordHash) {
      const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
      if (!isCurrentValid) {
        return NextResponse.json(
          { success: false, error: 'Current password does not match' },
          { status: 400 }
        );
      }
    }

    const newHash = await hashPassword(newPassword);
    await saveDbUser({
      ...user,
      passwordHash: newHash,
      mustChangePassword: false
    }, auth.user.id);

    await logDbActivity({
      brandId: user.brandId,
      userId: user.id,
      userEmail: user.email,
      action: 'change_password',
      entityType: 'user',
      entityId: user.id
    });

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('API /api/auth/change-password error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to change password' },
      { status: 500 }
    );
  }
}
