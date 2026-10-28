# Lobo's Travel Wizard API Reference & Developer Guide

The Lobo's Travel Wizard Itinerary Builder and Fleet Management Platform provides a secure external REST API for programmatic **Push** and **Pull** operations. External applications, booking systems, CRM platforms, and automated workflow scripts can create, update, and retrieve itineraries, destinations, sights/attractions, and partner hotels.

---

## 1. Authentication & Security

All `/api/external/*` endpoints require authentication via an API Key.

### API Key Headers
Pass your secret API key in either of the following HTTP headers:

1. **`X-API-Key` header (Recommended)**
   ```http
   X-API-Key: your_lobo_api_key_here
   ```

2. **`Authorization: Bearer` header**
   ```http
   Authorization: Bearer your_lobo_api_key_here
   ```

### Server Configuration
Set the secret key in your Vercel project environment variables (or `.env.local` for local development):
```env
LOBO_API_KEY=your_production_secret_key_here
```

> **Development Mode:** If `LOBO_API_KEY` is not set during local development, the development key `lobo_test_key_dev` is accepted for testing.

---

## 2. API Status & Directory

### `GET /api/external`
Check service health, active database provider (Neon Postgres, Vercel KV, or Supabase), authentication status, and view the live endpoint directory.

#### Sample Request
```bash
curl -X GET "https://itinerary-builder.vercel.app/api/external"
```

#### Sample Response (200 OK)
```json
{
  "service": "Lobo's Travel Wizard External Integration API",
  "version": "1.0.0",
  "status": "online",
  "database": {
    "provider": "Neon Postgres (Vercel)",
    "isCloud": true
  },
  "authentication": {
    "configured": true,
    "method": "API Key",
    "headersAccepted": ["X-API-Key: <key>", "Authorization: Bearer <key>"]
  }
}
```

---

## 3. Pull Endpoints (Read Data)

### 3.1 Fetch All Itineraries
`GET /api/external/itineraries`

Retrieve a list of saved itineraries with their full structured day-by-day JSON payloads.

#### Query Parameters
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `search` | string | `""` | Search query matching tour name, client name, reference number, or destination |
| `limit` | number | `50` | Maximum number of items to return (1 - 200) |
| `offset` | number | `0` | Pagination offset |

#### Sample Request
```bash
curl -X GET "https://itinerary-builder.vercel.app/api/external/itineraries?limit=10&search=delhi" \
  -H "X-API-Key: YOUR_API_KEY"
```

#### Sample Response (200 OK)
```json
{
  "success": true,
  "total": 4,
  "count": 4,
  "limit": 10,
  "offset": 0,
  "itineraries": [
    {
      "id": "itn-golden-triangle-5d",
      "referenceNumber": "LT-2026-0251",
      "voucherReference": "LTV-2026-0251",
      "tourName": "Golden Triangle Cultural Heritage Circuit",
      "clientName": "Dr. Rajesh & Sunita Sharma",
      "startDate": "2026-10-20",
      "endDate": "2026-10-24",
      "durationText": "4 Nights / 5 Days",
      "totalCost": 48500,
      "advancePaid": 20000,
      "pendingAmount": 28500,
      "paymentStatus": "Partially Paid",
      "vehicleDisplay": "Kia Carens – Private Air-Conditioned Vehicle",
      "days": [
        {
          "dayNumber": 1,
          "date": "2026-10-20",
          "destination": "Delhi",
          "title": "Arrival in Delhi & Orientation Tour",
          "overnightLocation": "Delhi",
          "description": "• Upon arrival at Delhi Airport, meet and greet with our representative and private chauffeur.\n• Check-in at your hotel.\n• Visit India Gate and Rashtrapati Bhavan.\n• Overnight stay in Delhi."
        }
      ]
    }
  ]
}
```

---

### 3.2 Retrieve a Specific Itinerary
`GET /api/external/itineraries/[id]`

Retrieve the complete JSON payload for an itinerary by:
- **Internal ID**: `itn-golden-triangle-5d`, `itn-12345`
- **Itinerary Reference Number**: `LT-2026-0251`
- **Voucher Reference Number**: `LTV-2026-0251`

#### Sample Request (Using Reference Number)
```bash
curl -X GET "https://itinerary-builder.vercel.app/api/external/itineraries/LT-2026-0251" \
  -H "X-API-Key: YOUR_API_KEY"
```

#### Sample Request (Using Voucher Number)
```bash
curl -X GET "https://itinerary-builder.vercel.app/api/external/itineraries/LTV-2026-0251" \
  -H "X-API-Key: YOUR_API_KEY"
```

#### Sample Response (200 OK)
```json
{
  "success": true,
  "itinerary": {
    "id": "itn-golden-triangle-5d",
    "referenceNumber": "LT-2026-0251",
    "voucherReference": "LTV-2026-0251",
    "tourName": "Golden Triangle Cultural Heritage Circuit",
    "clientName": "Dr. Rajesh & Sunita Sharma",
    "clientPhone": "+91 98200 12345",
    "clientEmail": "sharma.rajesh@example.com",
    "startDate": "2026-10-20",
    "endDate": "2026-10-24",
    "durationText": "4 Nights / 5 Days",
    "totalCost": 48500,
    "vehicleDisplay": "Kia Carens – Private Air-Conditioned Vehicle",
    "days": [ ... ]
  }
}
```

---

### 3.3 Pull Catalog Data (Destinations, Sights, Hotels)
`GET /api/external/catalog`

Fetches catalog items stored permanently in Neon Postgres.

#### Query Parameters
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | `"all"` | Filter by `"all"`, `"destinations"`, `"attractions"`, or `"hotels"` |
| `destination` | string | `""` | Filter sights or hotels by city/destination name (e.g. `delhi`, `agra`, `jaipur`) |

#### Sample Request
```bash
curl -X GET "https://itinerary-builder.vercel.app/api/external/catalog?type=all" \
  -H "X-API-Key: YOUR_API_KEY"
```

#### Sample Response (200 OK)
```json
{
  "success": true,
  "provider": "Neon Postgres (Vercel)",
  "counts": {
    "destinations": 10,
    "attractions": 58,
    "hotels": 24
  },
  "destinations": [
    {
      "id": "delhi",
      "name": "Delhi",
      "state": "Delhi NCR",
      "country": "India",
      "recommendedDuration": "2-3 Days",
      "heroImage": "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=1200&q=80"
    }
  ],
  "attractions": [
    {
      "id": "delhi-india-gate",
      "destinationId": "delhi",
      "destinationName": "Delhi",
      "name": "India Gate & Kartavya Path",
      "category": "Historical Monument",
      "image": "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80"
    }
  ],
  "hotels": [
    {
      "id": "delhi-the-leela-palace",
      "name": "The Leela Palace New Delhi",
      "city": "Delhi",
      "starCategory": 5,
      "rating": 4.9
    }
  ]
}
```

---

## 4. Push Endpoints (Write / Create / Update Data)

### 4.1 Push / Create a New Itinerary
`POST /api/external/itineraries`

Creates an itinerary programmatically. Automatically computes day dates, duration, voucher references, and generates dynamic narrative descriptions if omitted.

#### Request Body Schema
```typescript
{
  tourName: string;            // Required: e.g. "Royal Rajasthan Odyssey"
  clientName: string;          // Required: e.g. "Michael & Sarah Smith"
  clientPhone?: string;        // Optional: "+1 415 555 2671"
  clientEmail?: string;        // Optional: "sarah.smith@example.com"
  startDate?: string;          // Optional: "YYYY-MM-DD" e.g. "2026-11-15"
  endDate?: string;            // Optional: Auto-calculated if omitted
  datesNotConfirmed?: boolean; // Optional: true if dates are pending
  adults?: number;             // Optional: default 2
  children?: number;           // Optional: default 0
  vehicleDisplay?: string;     // Optional: "Toyota Innova Crysta – Private Vehicle"
  totalCost?: number;          // Optional: Total package cost in INR
  advancePaid?: number;        // Optional: Advance amount received in INR
  coverImage?: string;         // Optional: High-res brochure cover image URL
  days: [
    {
      dayNumber?: number;      // Optional: defaults to 1-based index
      date?: string;           // Optional: auto-computed from startDate
      destination: string;     // Required: e.g. "Delhi", "Agra", "Jaipur"
      title?: string;          // Optional: e.g. "Arrival & Red Fort Sightseeing"
      overnightLocation?: string; // Optional: defaults to destination
      description?: string;    // Optional: auto-generated if left blank
      meals?: {
        breakfast?: boolean;   // default: true
        lunch?: boolean;       // default: false
        dinner?: boolean;      // default: false
        note?: string;
      };
      images?: string[];       // Array of sightseeing photos
      arrivalDetails?: {       // Optional: for Day 1 arrival
        enabled: boolean;
        transitType?: "flight" | "train" | "bus";
        point?: string;
        flightOrTrainNumber?: string;
        arrivalTime?: string;
      };
      departureDetails?: {     // Optional: for final day drop-off
        enabled: boolean;
        transitType?: "flight" | "train" | "bus";
        point?: string;
        flightOrTrainNumber?: string;
        departureTime?: string;
      };
    }
  ];
  inclusions?: string[];       // Optional array of inclusion bullets
  exclusions?: string[];       // Optional array of exclusion bullets
}
```

#### Sample cURL Command
```bash
curl -X POST "https://itinerary-builder.vercel.app/api/external/itineraries" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tourName": "Agra & Taj Mahal 2-Day Escapade",
    "clientName": "Arthur Pendelton",
    "clientEmail": "arthur@example.com",
    "startDate": "2026-11-10",
    "totalCost": 26000,
    "advancePaid": 10000,
    "vehicleDisplay": "Kia Carens – Private Dedicated Vehicle",
    "days": [
      {
        "dayNumber": 1,
        "destination": "Agra",
        "title": "Delhi to Agra & Sunset Taj Mahal",
        "overnightLocation": "Agra",
        "description": "• Morning private transfer from Delhi to Agra.\n• Check-in at your hotel.\n• Late afternoon guided visit to the iconic Taj Mahal during golden sunset hours.\n• Overnight stay in Agra."
      },
      {
        "dayNumber": 2,
        "destination": "Agra",
        "title": "Agra Fort & Departure to Delhi",
        "overnightLocation": "Agra",
        "departureDetails": {
          "enabled": true,
          "transitType": "flight",
          "point": "Airport",
          "flightOrTrainNumber": "AI-402",
          "departureTime": "19:30 PM"
        }
      }
    ]
  }'
```

#### Sample Response (201 Created)
```json
{
  "success": true,
  "message": "Itinerary created successfully in database",
  "itinerary": {
    "id": "itn-ext-k8s9j1-a4b2",
    "referenceNumber": "LT-2026-8419",
    "voucherReference": "LTV-2026-8419",
    "tourName": "Agra & Taj Mahal 2-Day Escapade",
    "clientName": "Arthur Pendelton",
    "startDate": "2026-11-10",
    "endDate": "2026-11-11",
    "durationText": "1 Night / 2 Days",
    "totalCost": 26000,
    "advancePaid": 10000,
    "pendingAmount": 16000,
    "paymentStatus": "Partially Paid",
    "days": [ ... ]
  }
}
```

---

### 4.2 Update an Existing Itinerary
`PUT /api/external/itineraries/[id]`

Update any itinerary fields by ID, reference number (`LT-XXXX`), or voucher number (`LTV-XXXX`).

#### Sample cURL Command
```bash
curl -X PUT "https://itinerary-builder.vercel.app/api/external/itineraries/LT-2026-8419" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "totalCost": 28000,
    "advancePaid": 28000,
    "vehicleDisplay": "Toyota Innova Crysta – Luxury Private MUV",
    "specialInstructions": "Client requests English-speaking chauffeur and early check-in."
  }'
```

#### Sample Response (200 OK)
```json
{
  "success": true,
  "message": "Itinerary updated successfully in database",
  "itinerary": {
    "id": "itn-ext-k8s9j1-a4b2",
    "referenceNumber": "LT-2026-8419",
    "totalCost": 28000,
    "advancePaid": 28000,
    "pendingAmount": 0,
    "paymentStatus": "Paid",
    "vehicleDisplay": "Toyota Innova Crysta – Luxury Private MUV",
    "updatedAt": "2026-10-23T16:30:00.000Z"
  }
}
```

---

### 4.3 Push New Catalog Entries (Destinations, Sights, Hotels)
`POST /api/external/catalog`

Store new destinations, partner hotels, or attractions directly in Neon Postgres. Supports single entries or bulk payloads.

#### Option A: Push a Destination
```bash
curl -X POST "https://itinerary-builder.vercel.app/api/external/catalog" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "destination",
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "country": "India",
    "recommendedDuration": "2-3 Days",
    "shortDescription": "Yoga capital of the world on the banks of the sacred Ganges River.",
    "heroImage": "https://images.unsplash.com/photo-1600100397608-f010f44383a1?auto=format&fit=crop&w=1200&q=80"
  }'
```

#### Option B: Push a Partner Hotel
```bash
curl -X POST "https://itinerary-builder.vercel.app/api/external/catalog" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "hotel",
    "name": "Taj Rishikesh Resort & Spa",
    "city": "Rishikesh",
    "state": "Uttarakhand",
    "starCategory": 5,
    "rating": 4.9,
    "description": "Luxury Himalayan river-facing resort and wellness retreat.",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  }'
```

#### Option C: Push a Sight / Attraction
```bash
curl -X POST "https://itinerary-builder.vercel.app/api/external/catalog" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "attraction",
    "destinationId": "rishikesh",
    "destinationName": "Rishikesh",
    "name": "Triveni Ghat Evening Ganga Aarti",
    "category": "Spiritual & Cultural",
    "duration": "1.5 Hours",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
  }'
```

#### Option D: Bulk Catalog Push
```bash
curl -X POST "https://itinerary-builder.vercel.app/api/external/catalog" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "destinations": [
      { "name": "Varanasi", "state": "Uttar Pradesh" }
    ],
    "hotels": [
      { "name": "BrijRama Palace", "city": "Varanasi", "starCategory": 5 }
    ]
  }'
```

#### Sample Response (201 Created)
```json
{
  "success": true,
  "message": "Successfully processed 2 catalog item(s) in Neon database",
  "counts": {
    "destinations": 1,
    "hotels": 1,
    "attractions": 0
  }
}
```

---

## 5. Error Codes & Handling

| HTTP Code | Error | Resolution |
| :--- | :--- | :--- |
| `401 Unauthorized` | Missing or invalid API key | Provide a valid key in `X-API-Key` or `Authorization: Bearer <key>` header |
| `400 Bad Request` | Missing required payload field | Verify required fields (`tourName`, `name`, `city`, etc.) |
| `404 Not Found` | Itinerary identifier not found | Ensure ID or reference number (`LT-XXXX` / `LTV-XXXX`) is accurate |
| `500 Server Error` | Database connection or config failure | Check Neon Postgres connection string and `LOBO_API_KEY` configuration |

---

## 6. Real-Time UI Sync

Any itineraries or catalog entries pushed via these external API endpoints:
- Are permanently stored in **Neon Postgres**.
- Automatically sync to the **Lobo's Travel Wizard Web Dashboard**, **Itinerary Builder**, and **Destinations/Hotels Manager** upon page reload or database background sync.
- Can be viewed, previewed, and exported to high-resolution print-ready PDFs at any time.
