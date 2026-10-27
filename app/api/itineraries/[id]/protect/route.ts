import { NextRequest, NextResponse } from 'next/server';
import { toggleProtectDbItinerary } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await getAuthContext(req);
    const isSuperAdmin = auth?.user.role === 'super_admin';

    if (!isSuperAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Only a Super Admin can toggle protection on itineraries.' },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const isProtected = body.isProtected !== undefined ? !!body.isProtected : true;

    const result = await toggleProtectDbItinerary(id, isProtected, isSuperAdmin, auth?.user.id, auth?.user.email);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to toggle protection' }, { status: 400 });
    }

    return NextResponse.json({ success: true, id, isProtected });
  } catch (error: any) {
    console.error('API /api/itineraries/[id]/protect POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update protection' }, { status: 500 });
  }
}
