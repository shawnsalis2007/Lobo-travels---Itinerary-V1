import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbSettings, 
  saveDbSettings, 
  getActiveDbProvider 
} from '@/lib/db';
import { AppSettings } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbInfo = getActiveDbProvider();
    const settings = await getDbSettings();

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
    const body = await req.json();
    const settings = (body.data || body) as Partial<AppSettings>;

    const saved = await saveDbSettings(settings);
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
