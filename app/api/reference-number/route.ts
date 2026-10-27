import { NextRequest, NextResponse } from 'next/server';
import { getNextReferenceNumberAtomic, DEFAULT_BRAND_ID } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const auth = await getAuthContext(req);
    const brandId = searchParams.get('brandId') || (auth ? (auth.isViewingAs ? auth.activeBrandId : auth.user.brandId) : DEFAULT_BRAND_ID);
    const yearParam = searchParams.get('year');
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

    const result = await getNextReferenceNumberAtomic(brandId, year);
    return NextResponse.json({
      success: true,
      referenceNumber: result.referenceNumber,
      sequenceNumber: result.sequenceNumber,
      brandId
    });
  } catch (error: any) {
    console.error('API /api/reference-number error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate reference number' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
