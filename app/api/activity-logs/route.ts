import { NextRequest, NextResponse } from 'next/server';
import { getDbActivityLogs, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 100;

    const auth = await getAuthContext(req);
    let brandId: string | undefined = undefined;

    if (auth?.user.role === 'super_admin') {
      brandId = searchParams.get('brandId') || (auth.isViewingAs ? auth.activeBrandId : undefined);
    } else if (auth) {
      brandId = auth.user.brandId;
    } else {
      brandId = searchParams.get('brandId') || DEFAULT_BRAND_ID;
    }

    const logs = await getDbActivityLogs(brandId, limit);
    return NextResponse.json({ success: true, logs, count: logs.length });
  } catch (error: any) {
    console.error('API /api/activity-logs GET error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch activity logs' }, { status: 500 });
  }
}
