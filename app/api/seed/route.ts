import { NextRequest, NextResponse } from 'next/server';
import { seedNeonDatabase, getActiveDbProvider } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await seedNeonDatabase(false);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/seed GET error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to check seed status' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const force = !!body?.force;
    const result = await seedNeonDatabase(force);
    return NextResponse.json({
      ...result,
      message: 'Database tables ensured and initial catalog data seeded successfully'
    });
  } catch (error: any) {
    console.error('API /api/seed POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
