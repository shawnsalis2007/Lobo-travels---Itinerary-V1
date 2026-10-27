import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbSettings, 
  saveDbSettings, 
  getActiveDbProvider,
  ensurePostgresTables,
  DEFAULT_BRAND_ID
} from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { AppSettings } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const auth = await getAuthContext(req);
    const brandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID;
    const dbInfo = getActiveDbProvider();
    const settings = await getDbSettings(brandId);

    return NextResponse.json({
      success: true,
      settings,
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    });
  } catch (error: any) {
    console.error('API /api/settings GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensurePostgresTables();
    const auth = await getAuthContext(req);
    const brandId = auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID;
    const body = await req.json();
    const settings = (body.data || body) as Partial<AppSettings>;

    const saved = await saveDbSettings(settings, brandId);
    const dbInfo = getActiveDbProvider();

    return NextResponse.json({
      success: true,
      settings: saved,
      provider: dbInfo.label
    });
  } catch (error: any) {
    console.error('API /api/settings POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save settings' },
      { status: 500 }
    );
  }
}
