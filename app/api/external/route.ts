import { NextRequest, NextResponse } from 'next/server';
import { getActiveDbProvider } from '@/lib/db';
import { extractApiKey } from '@/lib/auth-api-key';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const dbInfo = getActiveDbProvider();
  const configuredKey = process.env.LOBO_API_KEY;
  const providedKey = extractApiKey(req);
  const isAuthenticated = !!(configuredKey && providedKey === configuredKey);

  const baseUrl = req.nextUrl.origin || 'https://itinerary-builder.vercel.app';

  return NextResponse.json({
    service: 'Lobo Travels External Integration API',
    version: '1.0.0',
    status: 'online',
    database: {
      provider: dbInfo.label,
      isCloud: dbInfo.isCloud
    },
    authentication: {
      configured: !!configuredKey,
      method: 'API Key',
      headersAccepted: ['X-API-Key: <key>', 'Authorization: Bearer <key>'],
      authenticatedInThisRequest: isAuthenticated
    },
    documentation: `${baseUrl}/docs/API_REFERENCE.md`,
    endpoints: [
      {
        method: 'GET',
        path: '/api/external/itineraries',
        description: 'Fetch list of all saved itineraries with full day-by-day structure',
        queryParameters: {
          search: 'Filter by tour name, client, reference number, or destination',
          limit: 'Max items to return (default: 50, max: 200)',
          offset: 'Pagination offset (default: 0)'
        },
        curl: `curl -H "X-API-Key: YOUR_API_KEY" "${baseUrl}/api/external/itineraries"`
      },
      {
        method: 'GET',
        path: '/api/external/itineraries/:id',
        description: 'Retrieve full detailed JSON for a specific itinerary by ID, reference number (LT-XXXX), or voucher number (LTV-XXXX)',
        curl: `curl -H "X-API-Key: YOUR_API_KEY" "${baseUrl}/api/external/itineraries/LT-2026-0251"`
      },
      {
        method: 'POST',
        path: '/api/external/itineraries',
        description: 'Push/create a new itinerary programmatically with structured day-by-day JSON payload',
        curl: `curl -X POST -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"tourName":"Golden Triangle Tour","clientName":"John Doe","startDate":"2026-11-01","days":[{"dayNumber":1,"destination":"Delhi","title":"Arrival in Delhi"}]}' "${baseUrl}/api/external/itineraries"`
      },
      {
        method: 'PUT',
        path: '/api/external/itineraries/:id',
        description: 'Update an existing itinerary by ID or reference number',
        curl: `curl -X PUT -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"tourName":"Updated Tour Name"}' "${baseUrl}/api/external/itineraries/LT-2026-0251"`
      },
      {
        method: 'GET',
        path: '/api/external/catalog',
        description: 'Pull catalog destinations, sights/attractions, and partner hotels stored in Neon Postgres',
        queryParameters: {
          type: 'Filter by "all" | "destinations" | "attractions" | "hotels" (default: all)',
          destination: 'Filter attractions or hotels by destination/city name'
        },
        curl: `curl -H "X-API-Key: YOUR_API_KEY" "${baseUrl}/api/external/catalog"`
      },
      {
        method: 'POST',
        path: '/api/external/catalog',
        description: 'Push new destinations, sights, or hotel entries into Neon Postgres',
        curl: `curl -X POST -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"type":"destination","name":"Rishikesh","state":"Uttarakhand"}' "${baseUrl}/api/external/catalog"`
      }
    ]
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
