import { NextRequest, NextResponse } from 'next/server';
import { restoreDbItinerary } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);

    const result = await restoreDbItinerary(id, auth?.user.id, auth?.user.email);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to restore itinerary' }, { status: 400 });
    }

    return NextResponse.json({ success: true, itinerary: result.itinerary });
  } catch (error: any) {
    console.error('API /api/itineraries/[id]/restore POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to restore itinerary' }, { status: 500 });
  }
}
