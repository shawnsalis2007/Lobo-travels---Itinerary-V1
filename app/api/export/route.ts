import { NextRequest, NextResponse } from 'next/server';
import { exportDatabaseBackup, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

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

    const backup = await exportDatabaseBackup(brandId);

    const filename = `lobo-backup-${new Date().toISOString().split('T')[0]}.json`;

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error: any) {
    console.error('API /api/export GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to export database backup' },
      { status: 500 }
    );
  }
}
