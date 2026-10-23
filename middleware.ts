import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from './lib/auth-api-key';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Intercept all /api/external/* routes
  if (pathname.startsWith('/api/external')) {
    // Allow public API spec / health check at root /api/external or /api/external/docs
    if (pathname === '/api/external' || pathname === '/api/external/docs') {
      return NextResponse.next();
    }

    const auth = validateApiKey(req);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/external/:path*'],
};
