import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, Brand, UserPermissions, UserRole } from '@/types';
import { 
  getDbUserByEmail, 
  getDbUserById, 
  getDbBrandById, 
  saveDbSession, 
  getDbSession, 
  deleteDbSession, 
  recordDbFailedLogin, 
  resetDbFailedLogin,
  logDbActivity,
  getDbBrandByCodeOrSlug
} from './db';

export const SESSION_COOKIE_NAME = 'lobo_session';
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  if (!plainText || !hash) return false;
  return bcrypt.compare(plainText, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Extracts session token from:
 * 1. Cookie 'lobo_session'
 * 2. Header 'Authorization: Bearer <token>'
 */
export function extractSessionToken(req: Request | NextRequest): string | null {
  // Check cookie
  if ('cookies' in req && typeof (req as NextRequest).cookies?.get === 'function') {
    const cookie = (req as NextRequest).cookies.get(SESSION_COOKIE_NAME);
    if (cookie?.value) return cookie.value.trim();
  }

  // Fallback to Cookie header
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]+)`));
    if (match && match[1]) return decodeURIComponent(match[1].trim());
  }

  // Check Authorization header
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (authHeader) {
    const bearer = authHeader.match(/^Bearer\s+(.+)$/i);
    if (bearer && bearer[1]) return bearer[1].trim();
  }

  return null;
}

export interface AuthContext {
  user: User;
  brand: Brand;
  activeBrandId: string;
  isViewingAs: boolean;
  viewingAsBrand: Brand | null;
}

/**
 * Validates session and returns authenticated context.
 * Checks: user active, account not locked, brand active.
 */
export async function getAuthContext(req: Request | NextRequest): Promise<AuthContext | null> {
  const token = extractSessionToken(req);
  if (!token) return null;

  const session = await getDbSession(token);
  if (!session) return null;

  // Check expiration
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    await deleteDbSession(token);
    return null;
  }

  const user = await getDbUserById(session.userId);
  if (!user || !user.isActive) return null;

  // Check account lockout
  if (user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()) {
    return null;
  }

  const brand = await getDbBrandById(user.brandId);
  if (!brand || (brand.status === 'suspended' && user.role !== 'super_admin')) {
    return null;
  }

  let viewingAsBrand: Brand | null = null;
  let activeBrandId = user.brandId;
  let isViewingAs = false;

  // Super Admin view-as header support
  const viewAsHeader = req.headers.get('x-view-as-brand');
  if (user.role === 'super_admin' && viewAsHeader && viewAsHeader.trim()) {
    const targetBrand = await getDbBrandById(viewAsHeader.trim()) || await getDbBrandByCodeOrSlug(viewAsHeader.trim());
    if (targetBrand) {
      viewingAsBrand = targetBrand;
      activeBrandId = targetBrand.id;
      isViewingAs = true;
    }
  }

  return {
    user,
    brand,
    activeBrandId,
    isViewingAs,
    viewingAsBrand
  };
}

/**
 * Guard for API routes requiring authenticated user and optional permission toggle.
 */
export async function requireAuth(
  req: Request | NextRequest, 
  permission?: keyof UserPermissions
): Promise<{ auth?: AuthContext; errorResponse?: NextResponse }> {
  const auth = await getAuthContext(req);
  if (!auth) {
    return {
      errorResponse: NextResponse.json(
        { success: false, error: 'Unauthorized: Session missing, expired or locked' },
        { status: 401 }
      )
    };
  }

  // Super Admin bypasses individual permission toggles
  if (auth.user.role === 'super_admin') {
    return { auth };
  }

  // Brand Admin has all permissions for their brand except super_admin dashboard
  if (auth.user.role === 'brand_admin') {
    return { auth };
  }

  // Staff permission check
  if (permission && !auth.user.permissions?.[permission]) {
    return {
      errorResponse: NextResponse.json(
        { 
          success: false, 
          error: `Forbidden: User does not have permission '${String(permission)}'` 
        },
        { status: 403 }
      )
    };
  }

  return { auth };
}

/**
 * Creates set-cookie header value for session
 */
export function createSessionCookie(token: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}`;
}

/**
 * Creates clear-cookie header value
 */
export function clearSessionCookie(): string {
  const isProd = process.env.NODE_ENV === 'production';
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}`;
}
