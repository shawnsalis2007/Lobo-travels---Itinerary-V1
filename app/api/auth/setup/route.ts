import { NextRequest, NextResponse } from 'next/server';
import { ensurePostgresTables, getDbUsers, getDbBrands, getActiveDbProvider } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensurePostgresTables();
    const [users, brands] = await Promise.all([getDbUsers(), getDbBrands()]);
    const dbInfo = getActiveDbProvider();

    return NextResponse.json({
      success: true,
      ready: users.length > 0 && brands.length > 0,
      userCount: users.length,
      brandCount: brands.length,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/auth/setup error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Database setup check failed' },
      { status: 500 }
    );
  }
}
