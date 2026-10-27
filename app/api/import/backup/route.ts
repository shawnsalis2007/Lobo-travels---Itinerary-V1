import { NextRequest, NextResponse } from 'next/server';
import { importBrowserDataToDb, ensurePostgresTables, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const body = await req.json().catch(() => ({}));
    const rawData = body.data || body;

    const auth = await getAuthContext(req);
    const brandId = body.brandId || (auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID);

    const stats = await importBrowserDataToDb(
      rawData, 
      brandId, 
      auth?.user.id, 
      auth?.user.email
    );

    return NextResponse.json({
      success: true,
      message: 'Backup JSON imported into database successfully',
      stats
    });
  } catch (error: any) {
    console.error('API /api/import/backup POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to import backup JSON' },
      { status: 500 }
    );
  }
}
