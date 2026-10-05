export type BookingStatus = 'Draft' | 'Generated' | 'Sent' | 'Confirmed' | 'Cancelled' | 'Completed';
export type PaymentStatus = 'Unpaid' | 'Partially Paid' | 'Paid' | 'Refunded' | 'Cancelled';
export type CostDisplayType = 'total_only' | 'breakdown';

export interface ChildInfo {
  id: string;
  age: number;
}

export interface DayMealPlan {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  note?: string;
}

export interface DayHotelSelection {
  hotelId?: string;
  name: string;
  city?: string;
  roomCategory: string;
  mealPlan: string;
  starCategory?: number;
  address?: string;
}

export interface DayTransfer {
  from: string;
  to: string;
  distanceKm?: number;
  driveTime?: string;
  description?: string;
}

export interface DayArrivalDetails {
  enabled: boolean;
  point: 'Airport' | 'Railway Station' | 'Bus Terminal' | 'Hotel Pickup' | 'Other';
  flightOrTrainNumber?: string;
  arrivalTime?: string;
  pickupLocation?: string;
  includeHotelCheckIn?: boolean;
  checkInTiming?: 'before_sightseeing' | 'after_sightseeing';
  notes?: string;
}

export interface DayDepartureDetails {
  enabled: boolean;
  point: 'Airport' | 'Railway Station' | 'Bus Terminal' | 'Hotel Drop' | 'Other';
  flightOrTrainNumber?: string;
  departureTime?: string;
  dropLocation?: string;
  notes?: string;
}

export type InterCityTransitType = 'car' | 'flight' | 'train';

export interface InterCityFlightDetails {
  flightNumber: string;
  airline?: string;
  departureAirport?: string;
  departureCity?: string;
  departureTime?: string;
  arrivalAirport?: string;
  arrivalCity?: string;
  arrivalTime?: string;
  pnr?: string;
}

export interface InterCityTrainDetails {
  trainNumber: string;
  trainName?: string;
  departureStation?: string;
  departureTime?: string;
  arrivalStation?: string;
  arrivalTime?: string;
  pnr?: string;
  coachClass?: string;
}

export interface CitySightseeing {
  id: string;
  destination: string;
  attractionIds: string[];
  attractionNames: string[];
  checkIn?: boolean;
  checkOut?: boolean;
  skipSightseeing?: boolean; // Proceed to next destination without sightseeing in this city
  transitType?: InterCityTransitType; // 'car' | 'flight' | 'train' (defaults to 'car')
  driveToNext?: {
    toCity: string;
    distanceKm?: number;
    driveTime?: string;
    routeVia?: string;
  };
  flightToNext?: InterCityFlightDetails;
  trainToNext?: InterCityTrainDetails;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date?: string;
  title: string;
  destination: string;
  attractionIds: string[];
  attractionNames: string[];
  description: string;
  isOvernightSameLocation: boolean;
  overnightLocation: string;
  transfer?: DayTransfer;
  meals: DayMealPlan;
  hotel?: DayHotelSelection;
  images: string[];
  notes?: string;
  // Day 1 / Arrival Details
  arrivalDetails?: DayArrivalDetails;
  // Final Day / Departure Details
  departureDetails?: DayDepartureDetails;
  // Multi-city sightseeing in a single day
  isMultiCity?: boolean;
  cities?: CitySightseeing[];
}

export interface BookedFlightInfo {
  id: string;
  type: 'arrival' | 'departure' | 'intercity';
  sectorTitle: string; // e.g. "Inbound / Arrival Flight (Mumbai → Delhi)"
  airline: string; // e.g. "IndiGo"
  flightNumber: string; // e.g. "6E-204"
  departureCity: string; // e.g. "Mumbai (BOM)"
  departureDate?: string;
  departureTime: string; // e.g. "07:15 AM"
  arrivalCity: string; // e.g. "Delhi (DEL T3)"
  arrivalDate?: string;
  arrivalTime: string; // e.g. "09:30 AM"
  pnr?: string; // e.g. "6E-ABC123"
  cabinClass?: string; // e.g. "Economy"
  baggage?: string; // e.g. "15 Kg Check-in + 7 Kg Cabin"
  notes?: string;
}

export interface TourFlightsBooking {
  flightsBookedByUs: boolean; // "Flight arrival and departure details if we book the flights"
  flights: BookedFlightInfo[];
}

export interface CostBreakdown {
  vehicle?: number;
  accommodation?: number;
  sightseeing?: number;
  guide?: number;
  transfers?: number;
  taxes?: number;
  other?: number;
}

export interface CalendarEventRef {
  calendarAccountId: string;
  eventId: string;
}

export interface Itinerary {
  id: string;
  referenceNumber: string;
  tourName: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  datesNotConfirmed: boolean;
  startDate?: string;
  endDate?: string;
  durationText: string;
  nights: number;
  daysCount: number;
  adults: number;
  children: number;
  childrenDetails: ChildInfo[];
  totalPax: number;
  paxSummary: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleCategory: string;
  customVehicle?: string;
  vehicleDisplay: string;
  days: ItineraryDay[];
  showCostInItinerary: boolean;
  costDisplayType: CostDisplayType;
  currency: string;
  currencySymbol: string;
  totalCost: number;
  costBreakdown: CostBreakdown;
  advancePaid: number;
  pendingAmount: number;
  paymentStatus: PaymentStatus;
  inclusions: string[];
  exclusions: string[];
  specialNotes: string;
  coverImage?: string;
  flightBookings?: TourFlightsBooking;
  status: BookingStatus;
  confirmedAt?: string;
  googleCalendarEventId?: string;
  calendarEventIds?: CalendarEventRef[];
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  shortDescription: string;
  detailedDescription: string;
  recommendedDuration: string;
  heroImage: string;
  gallery: string[];
}

export interface Attraction {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  duration: string;
  category: string;
  unesco: boolean;
  image: string;
  notes?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  starCategory: number;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  website: string;
  description: string;
  roomCategories: string[];
  mealPlans: string[];
  checkInTime: string;
  checkOutTime: string;
  image: string;
  gallery?: string[];
  partnershipStatus: 'Contracted' | 'Preferred' | 'Regular';
  contractedRate?: string;
  contactPerson?: string;
  googlePlaceId?: string;
}

export interface VehicleOption {
  brand: string;
  models: string[];
  category: string;
}

// ===================== ADD-ON TYPES =====================

export interface GoogleCalendarAccount {
  id: string;
  label: string;           // e.g. "Ravi — Dispatch"
  googleEmail: string;
  calendarId: string;      // specific Google Calendar ID within the account
  isDefault: boolean;      // default for new bookings
  connectionStatus: 'connected' | 'needs_reconnect';
  accessToken?: string;    // session token or active access token
  refreshToken?: string;   // persistent refresh token from OAuth auth code flow
  tokenExpiresAt?: number; // timestamp ms when accessToken expires
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber?: string;
  defaultVehicleId?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface FleetVehicle {
  id: string;
  plateNumber: string;     // unique, required
  brand: string;           // from Vehicle Catalogue
  model: string;           // from Vehicle Catalogue
  seats?: number;
  type?: string;
  colour?: string;
  year?: number;
  photo?: string;
  defaultDriverId?: string;
  status: 'active' | 'maintenance' | 'inactive';
  rcExpiry?: string;        // YYYY-MM-DD
  insuranceExpiry?: string; // YYYY-MM-DD
  pucExpiry?: string;       // YYYY-MM-DD
  createdAt: string;
  addedDate: string;        // date vehicle was added — for idle-day calculation
}

export interface BookingReminder {
  id: string;
  type: 'offset' | 'custom';
  offsetDays?: number;     // e.g. 7, 5, 2 — N days before tour start
  customDateTime?: string; // ISO string for exact date/time
  calendarAccountIds: string[];
  status: 'scheduled' | 'sent' | 'failed';
}

export interface BookingDayLocation {
  dayNo: number;
  date?: string;
  place: string;
  overridden: boolean;     // true if manually overridden from itinerary plan
}

export interface OutsourcedVehicleInfo {
  vendorCompanyName: string;
  vendorContactNumber: string;
  bookingConfirmed: boolean;
  vehicleDescription?: string;
  driverName?: string;
  driverPhone?: string;
}

export type OperationalBookingStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';

export interface OperationalBooking {
  id: string;
  voucherNo: string;           // LTV-XXXX-XXXX
  itineraryRef: string;        // LT-XXXX-XXXX
  itineraryId: string;         // links to Itinerary.id
  tourPackageName: string;
  client: {
    name: string;
    phone?: string;
    email?: string;
  };
  startDate: string;           // YYYY-MM-DD (may be prompted at voucher time)
  endDate: string;             // YYYY-MM-DD
  flightOrArrivalDetails?: string;  // auto from Day 1 arrivalDetails
  tourCost?: number;
  profit?: number;
  profitNote?: string;
  vehicleDisplay?: string;     // e.g. "Kia Carens"
  vehicleSource: 'own' | 'outsourced';
  ownVehicleId?: string;
  ownDriverId?: string;
  outsourced?: OutsourcedVehicleInfo;
  dayLocations: BookingDayLocation[];
  reminders: BookingReminder[];
  calendarEventIds: CalendarEventRef[];
  calendarAccountIds: string[];  // which calendars this booking is synced to
  status: OperationalBookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  companyName: string;
  tagline: string;
  logoUrl: string;
  phones: string[];
  email: string;
  address: string;
  website: string;
  referencePrefix: string;
  nextReferenceSequence: number;
  voucherTerms: string;
  defaultInclusions: string[];
  defaultExclusions: string[];
  brandColorPrimary: string;
  brandColorSecondary: string;
  brandColorAccent: string;
  connectedCalendars?: GoogleCalendarAccount[];
}
