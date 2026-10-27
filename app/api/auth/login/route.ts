import { NextRequest, NextResponse } from 'next/server';
import { getDbUserByEmail, recordDbFailedLogin, resetDbFailedLogin, getDbBrandById, saveDbSession, logDbActivity, ensurePostgresTables } from '@/lib/db';
import { verifyPassword, generateSessionToken, createSessionCookie, SESSION_MAX_AGE_SECONDS } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await getDbUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check account lockout
    if (user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()) {
      const waitMinutes = Math.ceil((new Date(user.lockedUntil).getTime() - Date.now()) / (60 * 1000));
      return NextResponse.json(
        { 
          success: false, 
          isLocked: true,
          error: `Account is temporarily locked due to multiple failed login attempts. Please try again in ${waitMinutes} minute(s).` 
        },
        { status: 423 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'This user account has been deactivated. Please contact your administrator.' },
        { status: 403 }
      );
    }

    // Verify password hash
    const isValid = await verifyPassword(password, user.passwordHash || '');
    if (!isValid) {
      const lockStatus = await recordDbFailedLogin(user.id);
      if (lockStatus.locked) {
        return NextResponse.json(
          {
            success: false,
            isLocked: true,
            error: 'Account locked due to 5 consecutive failed login attempts. Try again in 15 minutes.'
          },
          { status: 423 }
        );
      }
      const remaining = Math.max(0, 5 - ((user.failedLoginAttempts || 0) + 1));
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid email or password. ${remaining} attempt(s) remaining before temporary lockout.` 
        },
        { status: 401 }
      );
    }

    // Reset failed login counter on successful password
    await resetDbFailedLogin(user.id);

    // Get brand
    const brand = await getDbBrandById(user.brandId);
    if (!brand || (brand.status === 'suspended' && user.role !== 'super_admin')) {
      return NextResponse.json(
        { success: false, error: 'The brand associated with this account is currently suspended.' },
        { status: 403 }
      );
    }

    // Create session
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
    await saveDbSession(token, user.id, user.brandId, expiresAt);

    await logDbActivity({
      brandId: user.brandId,
      userId: user.id,
      userEmail: user.email,
      action: 'login',
      entityType: 'user',
      entityId: user.id,
      details: { role: user.role }
    });

    const safeUser = {
      id: user.id,
      brandId: user.brandId,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      permissions: user.permissions,
      mustChangePassword: user.mustChangePassword,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const res = NextResponse.json({
      success: true,
      token,
      user: safeUser,
      brand
    });

    // Set cookie
    res.headers.set('Set-Cookie', createSessionCookie(token));
    return res;
  } catch (error: any) {
    console.error('API /api/auth/login error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Login failed' },
      { status: 500 }
    );
  }
}
