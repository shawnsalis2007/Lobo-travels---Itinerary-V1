import { NextRequest, NextResponse } from 'next/server';

export interface ApiKeyValidationResult {
  authorized: boolean;
  errorResponse?: NextResponse;
  keyUsed?: string;
}

/**
 * Extracts the API key from request headers or query params:
 * 1. X-API-Key: <key>
 * 2. Authorization: Bearer <key>
 * 3. query param ?apiKey=<key> or ?api_key=<key>
 */
export function extractApiKey(req: Request | NextRequest): string | null {
  const headers = req.headers;

  // 1. X-API-Key header
  const xApiKey = headers.get('x-api-key') || headers.get('X-API-KEY') || headers.get('X-Api-Key');
  if (xApiKey && xApiKey.trim()) return xApiKey.trim();

  // 2. Authorization: Bearer <token>
  const authHeader = headers.get('authorization') || headers.get('Authorization');
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1]?.trim()) {
      return match[1].trim();
    }
  }

  // 3. Fallback to query param
  try {
    const url = new URL(req.url);
    const qKey = url.searchParams.get('apiKey') || url.searchParams.get('api_key');
    if (qKey && qKey.trim()) return qKey.trim();
  } catch {}

  return null;
}

/**
 * Validates the API key for external API requests against LOBO_API_KEY.
 * Provides clear and secure responses with helpful hints for developers.
 */
export function validateApiKey(req: Request | NextRequest): ApiKeyValidationResult {
  const configuredKey = process.env.LOBO_API_KEY;

  if (!configuredKey) {
    // If running in development and no key is set, permit a default dev key with clear hint
    if (process.env.NODE_ENV !== 'production') {
      const devDefault = 'lobo_test_key_dev';
      const providedKey = extractApiKey(req);
      if (providedKey === devDefault || providedKey === 'test' || providedKey === 'lobo_secret_key') {
        return { authorized: true, keyUsed: providedKey };
      }
      return {
        authorized: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: 'Unauthorized: Invalid or missing API key',
            hint: 'In local development, configure LOBO_API_KEY in .env.local or provide header "X-API-Key: lobo_test_key_dev"',
            receivedKey: providedKey ? '***' + providedKey.slice(-4) : null
          },
          { status: 401 }
        )
      };
    }

    return {
      authorized: false,
      errorResponse: NextResponse.json(
        {
          success: false,
          error: 'Server configuration error: LOBO_API_KEY environment variable is not configured on the server.'
        },
        { status: 500 }
      )
    };
  }

  const providedKey = extractApiKey(req);
  if (!providedKey) {
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Missing API key. Please supply a key using the X-API-Key header or Authorization: Bearer <key>.'
        },
        { status: 401 }
      )
    };
  }

  if (providedKey !== configuredKey) {
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid API key provided.'
        },
        { status: 401 }
      )
    };
  }

  return { authorized: true, keyUsed: providedKey };
}
