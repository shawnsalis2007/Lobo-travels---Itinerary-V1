import { Destination, Attraction, Hotel, VehicleOption, AppSettings, Itinerary, FleetVehicle, Driver, OperationalBooking } from '@/types';
import { COMPREHENSIVE_DESTINATIONS, COMPREHENSIVE_ATTRACTIONS } from './catalog-data';

export const DEFAULT_SETTINGS: AppSettings = {
  companyName: 'Lobo Travels',
  tagline: 'Travel packages, fleet operations, and all travel related solutions.',
  logoUrl: '/logo.png',
  phones: ['9811240072', '9891240072', '9312640072'],
  email: 'info@lobotravels.com',
  address: 'Shop No. 12, NDMC Market Near CNG Pump, Mandir Marg, New Delhi - 110001',
  website: 'lobotravels.com',
  referencePrefix: 'LT-2026-',
  nextReferenceSequence: 3,
  voucherTerms: 'Please reconfirm all hotel, sightseeing and transfer arrangements before the start of the tour. Valid government-issued photo ID is mandatory at all hotel check-ins and monument entrances. Chauffeur duty hours: 08:00 AM to 08:00 PM for local transfers except early morning scheduled transfers.',
  defaultInclusions: [
    'Private air-conditioned Kia Carens throughout the tour',
    'Hotel Accommodation - 1 Room with triple occupancy',
    'Breakfast as per hotel policy',
    'Sightseeing as per itinerary',
    'Experienced chauffeur',
    'Guides in Agra and Jaipur',
    'Fuel, tolls, parking & applicable taxes',
    'Driver allowances'
  ],
  defaultExclusions: [
    'Airfare & visa fees',
    'Monument / attraction entrance fees',
    'Guides - except where mentioned in the inclusions',
    'Food & beverages (lunches, dinners, snacks, alcoholic drinks)',
    'Additional sightseeing / activities not in itinerary',
    'Travel insurance',
    'Anything not specifically mentioned under inclusions'
  ],
  brandColorPrimary: '#151521',
  brandColorSecondary: '#26214F',
  brandColorAccent: '#9899A1',
  connectedCalendars: []
};

export const INITIAL_VEHICLES: VehicleOption[] = [
  {
    brand: 'Vehicle Not Selected Yet',
    models: ['Pending Confirmation', 'Not Selected Yet'],
    category: 'Other'
  },
  {
    brand: 'Toyota',
    models: ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Camry Hybrid', 'Etios', 'Urban Cruiser Taisor'],
    category: 'MUV'
  },
  {
    brand: 'Kia',
    models: ['Carens', 'Carnival', 'Seltos', 'EV6'],
    category: 'MUV'
  },
  {
    brand: 'Maruti Suzuki',
    models: ['Ertiga', 'Dzire', 'XL6', 'Grand Vitara', 'Ciaz'],
    category: 'Sedan'
  },
  {
    brand: 'Mahindra',
    models: ['Scorpio-N', 'XUV700', 'Invicto', 'Thar Roxx', 'Bolero Neo'],
    category: 'SUV'
  },
  {
    brand: 'Hyundai',
    models: ['Aura', 'Creta', 'Alcazar', 'Tucson', 'Verna'],
    category: 'Sedan'
  },
  {
    brand: 'Tata',
    models: ['Safari', 'Harrier', 'Nexon', 'Tigor'],
    category: 'SUV'
  },
  {
    brand: 'Honda',
    models: ['City', 'Elevate', 'Amaze'],
    category: 'Sedan'
  },
  {
    brand: 'MG',
    models: ['Hector Plus', 'Gloster', 'ZS EV'],
    category: 'SUV'
  },
  {
    brand: 'Tempo Traveller / Force',
    models: ['Force Urbania Luxury (12-Seater)', 'Tempo Traveller (12-Seater)', 'Tempo Traveller (16-Seater)', 'Tempo Traveller (20-Seater Maharaja)'],
    category: 'Tempo Traveller'
  },
  {
    brand: 'Mercedes-Benz',
    models: ['E-Class Sedan', 'V-Class Luxury Van', 'S-Class', 'GLC SUV'],
    category: 'Luxury'
  },
  {
    brand: 'Volvo',
    models: ['XC60', 'XC90 Luxury Coach (27/45-Seater)', '9600 Multi-Axle Bus'],
    category: 'Coach/Bus'
  },
  {
    brand: 'Other',
    models: ['Custom Chauffeur Driven Vehicle', 'Coach Bus (27-Seater)', 'Coach Bus (45-Seater)'],
    category: 'Other'
  }
];

export const INITIAL_DESTINATIONS: Destination[] = COMPREHENSIVE_DESTINATIONS;

export const INITIAL_ATTRACTIONS: Attraction[] = COMPREHENSIVE_ATTRACTIONS;

export const INITIAL_HOTELS: Hotel[] = [
  // Delhi
  {
    id: 'ht-delhi-1',
    name: 'The Lalit New Delhi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Barakhamba Avenue, Connaught Place, New Delhi - 110001',
    starCategory: 5,
    rating: 4.6,
    reviewCount: 9420,
    phone: '+91 11 4444 7777',
    email: 'delhi@thelalit.com',
    website: 'https://www.thelalit.com',
    description: 'Premier 5-star luxury hotel in Connaught Place featuring fine dining, spa, and modern amenities.',
    roomCategories: ['Deluxe Room', 'Executive Club Room', 'Luxury Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Room Only (EP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Contracted',
    contractedRate: '₹6,500/night'
  },
  {
    id: 'ht-delhi-2',
    name: 'Radisson Blu Marina Hotel Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    address: 'G-59 Connaught Circus, New Delhi - 110001',
    starCategory: 4,
    rating: 4.4,
    reviewCount: 4890,
    phone: '+91 11 4690 9090',
    email: 'reservations@rdmarinaconnaught.com',
    website: 'https://www.radissonhotels.com',
    description: 'Boutique heritage business hotel situated directly at Connaught Place shopping district.',
    roomCategories: ['Superior Room', 'Deluxe Room', 'Business Class Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },

  // Agra
  {
    id: 'ht-agra-1',
    name: 'ITC Mughal, A Luxury Collection Hotel',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Taj Ganj, Fatehabad Road, Agra - 282001',
    starCategory: 5,
    rating: 4.7,
    reviewCount: 11200,
    phone: '+91 562 402 1111',
    email: 'reservations.itcmughal@itchotels.in',
    website: 'https://www.itchotels.com',
    description: 'Spread over 23 acres of Mughal gardens, recipient of the Aga Khan Award for Architecture.',
    roomCategories: ['Mughal Room', 'Royal Mughal Suite', 'Presidential Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Contracted',
    contractedRate: '₹7,200/night'
  },
  {
    id: 'ht-agra-2',
    name: 'Courtyard by Marriott Agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Fatehabad Road, Tajganj, Agra - 282001',
    starCategory: 4,
    rating: 4.5,
    reviewCount: 6300,
    phone: '+91 562 245 7777',
    email: 'reservations.agra@marriott.com',
    website: 'https://www.marriott.com',
    description: 'Modern hotel minutes from the Taj Mahal with outdoor pool, multiple restaurants, and lawn.',
    roomCategories: ['Deluxe Room', 'Pool View Room', 'Executive Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Contracted',
    contractedRate: '₹4,800/night'
  },

  // Jaipur
  {
    id: 'ht-jaipur-1',
    name: 'Trident Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Jal Mahal, Amber Fort Road, Jaipur - 302002',
    starCategory: 5,
    rating: 4.7,
    reviewCount: 8850,
    phone: '+91 141 267 0101',
    email: 'reservations.jaipur@tridenthotels.com',
    website: 'https://www.tridenthotels.com',
    description: 'Breathtaking property facing Mansagar Lake and Jal Mahal with traditional Rajput hospitality.',
    roomCategories: ['Deluxe Garden View', 'Deluxe Lake View', 'Trident Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Contracted',
    contractedRate: '₹7,500/night'
  },
  {
    id: 'ht-jaipur-2',
    name: 'Hilton Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: '42 Geejgarh House, Hawa Sadak, Jaipur - 302006',
    starCategory: 5,
    rating: 4.5,
    reviewCount: 7120,
    phone: '+91 141 417 0000',
    email: 'info.jaipur@hilton.com',
    website: 'https://www.hilton.com',
    description: 'Centrally located luxury hotel featuring rooftop lounge with views of the Aravalli Hills.',
    roomCategories: ['Guest Room King', 'Deluxe Room', 'Executive Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },

  // Udaipur
  {
    id: 'ht-udaipur-1',
    name: 'The Lalit Laxmi Vilas Palace Udaipur',
    city: 'Udaipur',
    state: 'Rajasthan',
    address: 'Opposite Fateh Sagar Lake, Udaipur - 313004',
    starCategory: 5,
    rating: 4.6,
    reviewCount: 5120,
    phone: '+91 294 301 7777',
    email: 'udaipur@thelalit.com',
    website: 'https://www.thelalit.com',
    description: 'Historic heritage palace built by Maharana Fateh Singh in 1911 overlooking Fateh Sagar Lake.',
    roomCategories: ['Palace Deluxe Room', 'Valley View Room', 'Maharana Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Contracted'
  },

  // Amritsar
  {
    id: 'ht-amritsar-1',
    name: 'Hyatt Regency Amritsar',
    city: 'Amritsar',
    state: 'Punjab',
    address: 'MBM Farms, GT Road, Amritsar - 143001',
    starCategory: 5,
    rating: 4.6,
    reviewCount: 6400,
    phone: '+91 183 525 1234',
    email: 'amritsar.regency@hyatt.com',
    website: 'https://www.hyatt.com',
    description: 'Upscale 5-star hotel offering complimentary shuttle services to Sri Harmandir Sahib.',
    roomCategories: ['Standard King', 'Club Room', 'Regency Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },

  // ── Jaipur additions ──────────────────────────────────────────
  {
    id: 'ht-jaipur-amer-valley',
    name: 'Amer Valley',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Amer Road, Jaipur - 302028',
    starCategory: 3,
    rating: 4.0,
    reviewCount: 820,
    phone: '+91 141 000 0001',
    email: 'reservations@amervalley.com',
    website: '',
    description: 'Comfortable 3-star property near Amer Fort offering warm Rajasthani hospitality at affordable rates.',
    roomCategories: ['Standard Room', 'Deluxe Room'],
    mealPlans: ['Room Only (EP)', 'Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '12:00',
    checkOutTime: '10:00',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },
  {
    id: 'ht-jaipur-lilypool',
    name: 'Lilypool',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Civil Lines, Jaipur - 302006',
    starCategory: 4,
    rating: 4.3,
    reviewCount: 1540,
    phone: '+91 141 000 0002',
    email: 'reservations@lilypoolhotel.com',
    website: '',
    description: 'Stylish 4-star boutique hotel with a refreshing pool, rooftop dining, and pink-city charm.',
    roomCategories: ['Deluxe Room', 'Pool View Room', 'Junior Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },

  // ── Delhi additions ───────────────────────────────────────────
  {
    id: 'ht-delhi-arshiv',
    name: 'Arshiv',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Paharganj, New Delhi - 110055',
    starCategory: 3,
    rating: 3.9,
    reviewCount: 650,
    phone: '+91 11 000 0001',
    email: 'reservations@arshivhotel.com',
    website: '',
    description: 'Budget-friendly 3-star hotel in central Delhi ideal for transit stays and budget travellers.',
    roomCategories: ['Standard Room', 'Deluxe Room'],
    mealPlans: ['Room Only (EP)', 'Breakfast Included (CP)'],
    checkInTime: '12:00',
    checkOutTime: '10:00',
    image: 'https://images.unsplash.com/photo-1600077106724-946750eeaf3c?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },
  {
    id: 'ht-delhi-golden-grand',
    name: 'Golden Grand',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Connaught Place, New Delhi - 110001',
    starCategory: 4,
    rating: 4.2,
    reviewCount: 2100,
    phone: '+91 11 000 0002',
    email: 'reservations@goldengrandhotel.com',
    website: '',
    description: 'Contemporary 4-star hotel in the heart of Delhi with modern rooms and all-day dining.',
    roomCategories: ['Superior Room', 'Deluxe Room', 'Executive Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },
  {
    id: 'ht-delhi-sheraton',
    name: 'Sheraton New Delhi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'District Centre, Saket, New Delhi - 110017',
    starCategory: 5,
    rating: 4.5,
    reviewCount: 5800,
    phone: '+91 11 4266 1122',
    email: 'delhi.sheraton@marriott.com',
    website: 'https://www.marriott.com/hotels/travel/delsi-sheraton-new-delhi-hotel',
    description: 'Iconic 5-star luxury hotel in Saket with fine dining, a rooftop pool, and world-class facilities.',
    roomCategories: ['Deluxe Room', 'Club Room', 'Sheraton Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },

  // ── Agra additions ────────────────────────────────────────────
  {
    id: 'ht-agra-sarovar-portico',
    name: 'Sarovar Portico Agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Taj Nagari Scheme, Fatehabad Road, Agra - 282001',
    starCategory: 3,
    rating: 4.0,
    reviewCount: 1230,
    phone: '+91 562 000 0001',
    email: 'agra@sarovarhotels.com',
    website: 'https://www.sarovarhotels.com',
    description: 'Value-for-money 3-star hotel conveniently located on Fatehabad Road near the Taj Mahal.',
    roomCategories: ['Standard Room', 'Deluxe Room'],
    mealPlans: ['Room Only (EP)', 'Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '12:00',
    checkOutTime: '10:00',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },
  {
    id: 'ht-agra-fairfield-marriott',
    name: 'Fairfield by Marriott Agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Taj Nagari, Fatehabad Road, Agra - 282001',
    starCategory: 4,
    rating: 4.4,
    reviewCount: 3600,
    phone: '+91 562 661 7777',
    email: 'agra@fairfield.com',
    website: 'https://www.marriott.com',
    description: 'Bright, modern 4-star hotel steps from the Taj Mahal with an outdoor pool and rooftop views.',
    roomCategories: ['Standard Room', 'Deluxe Room', 'Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  },
  {
    id: 'ht-agra-tajview',
    name: 'Tajview Agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Taj Ganj, Fatehabad Road, Agra - 282001',
    starCategory: 5,
    rating: 4.6,
    reviewCount: 7200,
    phone: '+91 562 223 1400',
    email: 'reservations@tajviewagra.com',
    website: 'https://www.tajhotels.com',
    description: 'Luxury 5-star hotel offering unobstructed views of the Taj Mahal from its rooms and terraces.',
    roomCategories: ['Taj View Room', 'Deluxe Suite', 'Presidential Suite'],
    mealPlans: ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    partnershipStatus: 'Preferred'
  }
];

export const PRESET_ROUTES: Record<string, { distanceKm: number; driveTime: string; description: string }> = {
  'delhi-agra': {
    distanceKm: 210,
    driveTime: '3.5–4 Hours',
    description: 'Smooth drive via the 6-lane Yamuna Expressway connecting Delhi to Agra.'
  },
  'agra-jaipur': {
    distanceKm: 240,
    driveTime: '4.5–5 Hours',
    description: 'Scenic highway drive via Bikaner-Agra Road with an en-route stop at Fatehpur Sikri.'
  },
  'jaipur-delhi': {
    distanceKm: 280,
    driveTime: '4.5–5 Hours',
    description: 'Fast transit along the Delhi-Mumbai Expressway / NH48 back to the capital.'
  },
  'jaipur-jodhpur': {
    distanceKm: 335,
    driveTime: '6 Hours',
    description: 'Westward highway drive through Rajasthan heartland towards the Blue City.'
  },
  'jodhpur-udaipur': {
    distanceKm: 260,
    driveTime: '5 Hours',
    description: 'Picturesque journey across the Aravallis with optional visit to Ranakpur Jain Temple.'
  },
  'delhi-amritsar': {
    distanceKm: 450,
    driveTime: '7–8 Hours',
    description: 'Grand Trunk Road journey across Haryana and Punjab farmlands.'
  },
  'delhi-shimla': {
    distanceKm: 340,
    driveTime: '7–8 Hours',
    description: 'Hill ascent via Himalayan Expressway through Kalka and Solan.'
  },
  'shimla-manali': {
    distanceKm: 250,
    driveTime: '7–8 Hours',
    description: 'Mountain drive along the Beas and Satluj river valleys with spectacular canyon views.'
  },
  'agra-bharatpur': {
    distanceKm: 55,
    driveTime: '1–1.5 Hours',
    description: 'Short pleasant countryside transfer along NH21.'
  }
};

export const INITIAL_ITINERARIES: Itinerary[] = [
  {
    id: 'itn-001',
    referenceNumber: 'LT-2026-0001',
    tourName: 'Golden Triangle Tour – Delhi, Agra & Jaipur',
    clientName: 'Dr. Rajesh & Sunita Sharma',
    clientPhone: '+91 98112 34567',
    clientEmail: 'rajesh.sharma@gmail.com',
    datesNotConfirmed: false,
    startDate: '2026-10-20',
    endDate: '2026-10-24',
    durationText: '4 Nights / 5 Days',
    nights: 4,
    daysCount: 5,
    adults: 2,
    children: 1,
    childrenDetails: [{ id: 'c1', age: 10 }],
    totalPax: 3,
    paxSummary: '2 Adults + 1 Child (Age 10)',
    vehicleBrand: 'Kia',
    vehicleModel: 'Carens',
    vehicleCategory: 'MUV',
    vehicleDisplay: 'Kia Carens – Private Air-Conditioned Vehicle',
    includeHotels: true,
    showCostInItinerary: true,
    costDisplayType: 'total_only',
    currency: 'INR',
    currencySymbol: '₹',
    totalCost: 49000,
    costBreakdown: {
      vehicle: 18000,
      accommodation: 21000,
      sightseeing: 4000,
      guide: 3500,
      taxes: 2500
    },
    advancePaid: 20000,
    pendingAmount: 29000,
    paymentStatus: 'Partially Paid',
    inclusions: [
      'Private air-conditioned Kia Carens throughout the tour',
      'Hotel Accommodation - 1 Room with triple occupancy',
      'Breakfast as per hotel policy',
      'Sightseeing as per itinerary',
      'Experienced chauffeur',
      'Guides in Agra and Jaipur',
      'Fuel, tolls, parking & applicable taxes',
      'Driver allowances'
    ],
    exclusions: [
      'Airfare & visa fees',
      'Monument / attraction entrance fees',
      'Guides - except where mentioned in the inclusions',
      'Food & beverages (lunches, dinners, snacks, alcoholic drinks)',
      'Additional sightseeing / activities',
      'Travel insurance',
      'Anything not specifically mentioned under inclusions'
    ],
    specialNotes: 'Taj Mahal remains closed on Fridays. Comfortable walking shoes and conservative attire recommended for temple and monument visits.',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    flightBookings: {
      flightsBookedByUs: true,
      flights: [
        {
          id: 'fl-1',
          type: 'arrival',
          sectorTitle: 'Inbound / Arrival Flight (Mumbai → Delhi)',
          airline: 'IndiGo',
          flightNumber: '6E-204',
          departureCity: 'Mumbai (BOM)',
          departureDate: '2026-10-20',
          departureTime: '07:15 AM',
          arrivalCity: 'Delhi (DEL T3)',
          arrivalDate: '2026-10-20',
          arrivalTime: '09:30 AM',
          pnr: '6E-J982KL',
          cabinClass: 'Economy',
          baggage: '15 Kg Check-in + 7 Kg Cabin',
          notes: 'Direct Flight'
        },
        {
          id: 'fl-2',
          type: 'departure',
          sectorTitle: 'Outbound / Return Flight (Jaipur → Mumbai)',
          airline: 'Air India',
          flightNumber: 'AI-402',
          departureCity: 'Jaipur (JAI)',
          departureDate: '2026-10-24',
          departureTime: '18:45 PM',
          arrivalCity: 'Mumbai (BOM)',
          arrivalDate: '2026-10-24',
          arrivalTime: '20:55 PM',
          pnr: 'AI-982XZY',
          cabinClass: 'Economy',
          baggage: '15 Kg Check-in + 7 Kg Cabin',
          notes: 'Direct Flight'
        }
      ]
    },
    status: 'Confirmed',
    confirmedAt: '2026-09-25T11:30:00Z',
    createdAt: '2026-09-24T10:00:00Z',
    updatedAt: '2026-09-25T11:30:00Z',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2026-10-20',
        title: 'Arrival in Delhi & Capital Heritage Tour',
        destination: 'Delhi',
        attractionIds: ['delhi-qutub', 'delhi-lotus', 'delhi-india-gate'],
        attractionNames: ['Qutub Minar Complex', 'Lotus Temple (Baháʼí House of Worship)', 'India Gate & Kartavya Path'],
        description: 'Arrive in New Delhi where you will be warmly received by your Lobo Travels chauffeur. Begin your introduction to the national capital with a visit to the UNESCO-listed Qutub Minar, followed by the serene white marble petals of the Lotus Temple. In the late afternoon, drive along the ceremonial Kartavya Path to view India Gate and Rashtrapati Bhavan.',
        isOvernightSameLocation: true,
        overnightLocation: 'Delhi',
        arrivalDetails: {
          enabled: true,
          point: 'Airport',
          flightOrTrainNumber: 'IndiGo 6E-204',
          arrivalTime: '09:30 AM',
          includeHotelCheckIn: true,
          checkInTiming: 'before_sightseeing'
        },
        meals: {
          breakfast: false,
          lunch: false,
          dinner: true,
          note: 'Dinner at hotel restaurant'
        },
        hotel: {
          hotelId: 'ht-delhi-1',
          name: 'The Lalit New Delhi',
          city: 'Delhi',
          roomCategory: 'Deluxe Room',
          mealPlan: 'Breakfast Included (CP)',
          starCategory: 5
        },
        images: []
      },
      {
        id: 'day-2',
        dayNumber: 2,
        date: '2026-10-21',
        title: 'Delhi Heritage to the City of Taj',
        destination: 'Delhi',
        attractionIds: ['delhi-humayun', 'delhi-red-fort'],
        attractionNames: ['Humayun’s Tomb', 'Red Fort (Lal Qila)'],
        description: 'Enjoy a leisurely breakfast before exploring Humayun’s Tomb, the architectural forerunner to the Taj Mahal. Continue for a panoramic photo stop of the Red Fort in Old Delhi. In the afternoon, proceed via the Yamuna Expressway to Agra. Upon arrival, check in to your hotel and unwind.',
        isOvernightSameLocation: false,
        overnightLocation: 'Agra',
        transfer: {
          from: 'Delhi',
          to: 'Agra',
          distanceKm: 210,
          driveTime: '3.5–4 Hours',
          description: 'Drive from Delhi to Agra via Yamuna Expressway for overnight stay.'
        },
        meals: {
          breakfast: true,
          lunch: false,
          dinner: false,
          note: 'Breakfast at hotel'
        },
        hotel: {
          hotelId: 'ht-agra-1',
          name: 'ITC Mughal, A Luxury Collection Hotel',
          city: 'Agra',
          roomCategory: 'Mughal Room',
          mealPlan: 'Breakfast Included (CP)',
          starCategory: 5
        },
        images: []
      },
      {
        id: 'day-3',
        dayNumber: 3,
        date: '2026-10-22',
        title: 'Taj Mahal Sunrise, Fatehpur Sikri & Journey to Jaipur',
        destination: 'Agra',
        attractionIds: ['agra-taj-mahal', 'agra-fort', 'fs-buland-darwaza'],
        attractionNames: ['Taj Mahal (Sunrise / Daytime Tour)', 'Agra Fort (Lal Qila of Agra)', 'Buland Darwaza & Jama Masjid'],
        description: 'Morning check-out from hotel in Agra. In Agra, proceed for sightseeing including Taj Mahal (Sunrise / Daytime Tour), Agra Fort (Lal Qila of Agra). Later, embark on a comfortable highway drive to Jaipur via Fatehpur Sikri & Bharatpur. Upon arrival in Jaipur, transfer and check-in at your designated hotel. Breakfast and dinner are included for the day. Overnight stay at your designated hotel in Jaipur.',
        isOvernightSameLocation: false,
        overnightLocation: 'Jaipur',
        isMultiCity: true,
        cities: [
          {
            id: 'c-3-1',
            destination: 'Agra',
            attractionIds: ['agra-taj-mahal', 'agra-fort'],
            attractionNames: ['Taj Mahal (Sunrise / Daytime Tour)', 'Agra Fort (Lal Qila of Agra)'],
            checkOut: true,
            checkIn: false,
            transitType: 'car',
            driveToNext: {
              toCity: 'Jaipur',
              distanceKm: 240,
              driveTime: '4.5 Hours',
              routeVia: 'Fatehpur Sikri'
            }
          },
          {
            id: 'c-3-2',
            destination: 'Jaipur',
            attractionIds: ['fs-buland-darwaza'],
            attractionNames: ['Buland Darwaza & Jama Masjid'],
            checkOut: false,
            checkIn: true
          }
        ],
        meals: {
          breakfast: true,
          lunch: false,
          dinner: true,
          note: 'Breakfast at hotel, traditional Rajasthani dinner'
        },
        hotel: {
          hotelId: 'ht-jaipur-1',
          name: 'Trident Jaipur',
          city: 'Jaipur',
          roomCategory: 'Deluxe Lake View',
          mealPlan: 'Breakfast Included (CP)',
          starCategory: 5
        },
        images: []
      },
      {
        id: 'day-4',
        dayNumber: 4,
        date: '2026-10-23',
        title: 'Amber Fort & Pink City Royal Palaces',
        destination: 'Jaipur',
        attractionIds: ['jaipur-amber-fort', 'jaipur-hawa-mahal', 'jaipur-city-palace', 'jaipur-jantar-mantar'],
        attractionNames: ['Amber Fort & Palace (Amer Fort)', 'Hawa Mahal (Palace of Winds)', 'City Palace, Jaipur', 'Jantar Mantar Astronomical Observatory'],
        description: 'Ascend to the hilltop Amber Fort and marvel at the sparkling mirror mosaics of the Sheesh Mahal. Pause at the picturesque Jal Mahal and the honeycomb facade of Hawa Mahal. In the afternoon, tour the royal museum at the City Palace and examine the stone astronomical instruments of UNESCO Jantar Mantar.',
        isOvernightSameLocation: true,
        overnightLocation: 'Jaipur',
        meals: {
          breakfast: true,
          lunch: false,
          dinner: false,
          note: 'Breakfast at hotel'
        },
        hotel: {
          hotelId: 'ht-jaipur-1',
          name: 'Trident Jaipur',
          city: 'Jaipur',
          roomCategory: 'Deluxe Lake View',
          mealPlan: 'Breakfast Included (CP)',
          starCategory: 5
        },
        images: []
      },
      {
        id: 'day-5',
        dayNumber: 5,
        date: '2026-10-24',
        title: 'Jaipur Bazaars & Departure Transfer to Delhi',
        destination: 'Jaipur',
        attractionIds: ['jaipur-jal-mahal'],
        attractionNames: ['Jal Mahal (Water Palace Photo Stop)'],
        description: 'After breakfast and hotel check-out, spend some time exploring Jaipur’s vibrant handicraft and gemstone bazaars at Johari Bazaar. Later, board your comfortable vehicle for your return transfer to Delhi Airport or Railway Station for your onward journey with fond memories of Lobo Travels.',
        isOvernightSameLocation: true,
        overnightLocation: 'Delhi / Departure',
        departureDetails: {
          enabled: true,
          point: 'Airport',
          flightOrTrainNumber: 'Air India AI-402',
          departureTime: '18:45 PM',
          dropLocation: 'Jaipur Airport / Delhi Airport Terminal 3'
        },
        meals: {
          breakfast: true,
          lunch: false,
          dinner: false,
          note: 'Breakfast at hotel'
        },
        images: []
      }
    ]
  },
  {
    id: 'itn-002',
    referenceNumber: 'LT-2026-0002',
    tourName: 'Kashmir Valley & Gulmarg Snow Explorer',
    clientName: 'Sunil & Neha Verma',
    clientPhone: '+91 99100 88221',
    clientEmail: 'sverma@outlook.com',
    datesNotConfirmed: true,
    startDate: '',
    endDate: '',
    durationText: 'To Be Confirmed',
    nights: 5,
    daysCount: 6,
    adults: 2,
    children: 0,
    childrenDetails: [],
    totalPax: 2,
    paxSummary: '2 Adults',
    vehicleBrand: 'Toyota',
    vehicleModel: 'Innova Crysta',
    vehicleCategory: 'MUV',
    vehicleDisplay: 'Toyota Innova Crysta – Private Air-Conditioned Vehicle',
    showCostInItinerary: false,
    costDisplayType: 'total_only',
    currency: 'INR',
    currencySymbol: '₹',
    totalCost: 62000,
    costBreakdown: {
      vehicle: 24000,
      accommodation: 30000,
      sightseeing: 5000,
      taxes: 3000
    },
    advancePaid: 0,
    pendingAmount: 62000,
    paymentStatus: 'Unpaid',
    inclusions: [
      'Private air-conditioned Toyota Innova Crysta throughout',
      '5 Nights Deluxe Hotel / Premium Houseboat Accommodation',
      'Daily buffet breakfast and dinner (MAP plan)',
      '1 Hour complimentary Shikara ride on Dal Lake',
      'All toll taxes, parking fees, and driver allowances'
    ],
    exclusions: [
      'Gondola cable car ride tickets in Gulmarg',
      'Pony rides or snow sledges in Gulmarg/Pahalgam',
      'Lunches, personal tips, and laundry',
      'Anything not explicitly mentioned in inclusions'
    ],
    specialNotes: 'Prepaid SIM cards issued outside Jammu & Kashmir do not work. Postpaid connections (Airtel, Jio, BSNL) are recommended.',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    status: 'Draft',
    createdAt: '2026-09-27T14:00:00Z',
    updatedAt: '2026-09-27T14:00:00Z',
    days: [
      {
        id: 'day-k1',
        dayNumber: 1,
        title: 'Arrival in Srinagar & Dal Lake Shikara Ride',
        destination: 'Srinagar',
        attractionIds: ['srinagar-dal-lake-shikara', 'srinagar-mughal-gardens'],
        attractionNames: ['Dal Lake Sunset Shikara Ride & Floating Markets', 'Mughal Gardens (Nishat & Shalimar Bagh)'],
        description: 'Arrive at Srinagar Airport and transfer to your luxury houseboat or hotel. In the evening, enjoy a peaceful Shikara boat ride on Dal Lake, exploring floating gardens and local artisan shops.',
        isOvernightSameLocation: true,
        overnightLocation: 'Srinagar',
        meals: { breakfast: false, lunch: false, dinner: true, note: 'Dinner at hotel' },
        images: ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80']
      }
    ]
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'dr-1',
    name: 'Ramesh Kumar',
    phone: '9811240072',
    licenseNumber: 'DL-0420180012345',
    defaultVehicleId: 'veh-1',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'dr-2',
    name: 'Rajesh Sharma',
    phone: '9891240072',
    licenseNumber: 'DL-0420190054321',
    defaultVehicleId: 'veh-2',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'dr-3',
    name: 'Vikram Singh',
    phone: '9312640072',
    licenseNumber: 'DL-0420200098765',
    defaultVehicleId: 'veh-3',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const INITIAL_FLEET: FleetVehicle[] = [
  {
    id: 'veh-1',
    plateNumber: 'DL 1ZA 4072',
    brand: 'Kia',
    model: 'Carens',
    seats: 7,
    type: 'MUV',
    colour: 'Glacier White Pearl',
    year: 2024,
    defaultDriverId: 'dr-1',
    status: 'active',
    rcExpiry: '2039-01-10',
    insuranceExpiry: '2027-01-10',
    pucExpiry: '2027-01-10',
    createdAt: '2026-01-10T00:00:00Z',
    addedDate: '2026-01-10'
  },
  {
    id: 'veh-2',
    plateNumber: 'DL 2CB 9811',
    brand: 'Toyota',
    model: 'Innova Crysta',
    seats: 7,
    type: 'MUV',
    colour: 'Silver Metallic',
    year: 2023,
    defaultDriverId: 'dr-2',
    status: 'active',
    rcExpiry: '2038-01-15',
    insuranceExpiry: '2027-01-15',
    pucExpiry: '2026-11-20',
    createdAt: '2026-01-15T00:00:00Z',
    addedDate: '2026-01-15'
  },
  {
    id: 'veh-3',
    plateNumber: 'DL 3CA 1240',
    brand: 'Force',
    model: 'Urbania',
    seats: 12,
    type: 'Tempo Traveller',
    colour: 'Pure White',
    year: 2024,
    defaultDriverId: 'dr-3',
    status: 'active',
    rcExpiry: '2039-02-01',
    insuranceExpiry: '2027-02-01',
    pucExpiry: '2027-02-01',
    createdAt: '2026-02-01T00:00:00Z',
    addedDate: '2026-02-01'
  }
];

export const INITIAL_OPERATIONAL_BOOKINGS: OperationalBooking[] = [
  {
    id: 'bk-1',
    voucherNo: 'LTV-2026-0001',
    itineraryRef: 'LT-2026-0001',
    itineraryId: 'itn-1',
    tourPackageName: 'Golden Triangle Classic Journey – Delhi, Agra & Jaipur',
    client: {
      name: 'Dr. Alistair & Margaret Vance',
      phone: '+44 7700 900123',
      email: 'a.vance@edinburgh-med.ac.uk'
    },
    startDate: '2026-10-15',
    endDate: '2026-10-20',
    flightOrArrivalDetails: 'IndiGo 6E-204 from London Heathrow / Mumbai (09:30 AM)',
    tourCost: 68500,
    profit: 14200,
    profitNote: 'Fuel & toll ₹6,500; Hotels ₹42,000; Guides ₹5,800',
    vehicleDisplay: 'Kia Carens – Private Air-Conditioned Vehicle',
    vehicleSource: 'own',
    ownVehicleId: 'veh-1',
    ownDriverId: 'dr-1',
    dayLocations: [
      { dayNo: 1, date: '2026-10-15', place: 'Delhi', overridden: false },
      { dayNo: 2, date: '2026-10-16', place: 'Delhi', overridden: false },
      { dayNo: 3, date: '2026-10-17', place: 'Agra', overridden: false },
      { dayNo: 4, date: '2026-10-18', place: 'Jaipur', overridden: false },
      { dayNo: 5, date: '2026-10-19', place: 'Jaipur', overridden: false },
      { dayNo: 6, date: '2026-10-20', place: 'Delhi Departure', overridden: false }
    ],
    reminders: [
      {
        id: 'rem-1',
        type: 'offset',
        offsetDays: 7,
        calendarAccountIds: [],
        status: 'scheduled'
      },
      {
        id: 'rem-2',
        type: 'offset',
        offsetDays: 2,
        calendarAccountIds: [],
        status: 'scheduled'
      }
    ],
    calendarEventIds: [],
    calendarAccountIds: [],
    status: 'scheduled',
    createdAt: '2026-09-28T09:00:00Z',
    updatedAt: '2026-09-28T09:00:00Z'
  },
  {
    id: 'bk-2',
    voucherNo: 'LTV-2026-0002',
    itineraryRef: 'LT-2026-0002',
    itineraryId: 'itn-2',
    tourPackageName: 'Kashmir Paradise & Dal Lake Experience',
    client: {
      name: 'Rajesh & Sunita Mehra',
      phone: '+91 98200 12345',
      email: 'rajesh.mehra@corporategroup.in'
    },
    startDate: '2026-10-01',
    endDate: '2026-10-06',
    flightOrArrivalDetails: 'Air India AI-825 landing Srinagar (11:15 AM)',
    tourCost: 84000,
    profit: 18500,
    profitNote: 'Outsourced local Kashmir Innova fleet; confirmed with Peer Travels',
    vehicleDisplay: 'Toyota Innova Crysta',
    vehicleSource: 'outsourced',
    outsourced: {
      vendorCompanyName: 'Valley Peer Travels Pvt Ltd',
      vendorContactNumber: '+91 194 245 8899',
      bookingConfirmed: true,
      vehicleDescription: 'Innova Crysta JK 01 AK 9988',
      driverName: 'Bashir Ahmed',
      driverPhone: '+91 94190 55443'
    },
    dayLocations: [
      { dayNo: 1, date: '2026-10-01', place: 'Srinagar Dal Lake', overridden: false },
      { dayNo: 2, date: '2026-10-02', place: 'Gulmarg Gondola Stop', overridden: false },
      { dayNo: 3, date: '2026-10-03', place: 'Pahalgam Valley', overridden: false },
      { dayNo: 4, date: '2026-10-04', place: 'Pahalgam', overridden: false },
      { dayNo: 5, date: '2026-10-05', place: 'Srinagar Houseboat', overridden: false },
      { dayNo: 6, date: '2026-10-06', place: 'Srinagar Airport', overridden: false }
    ],
    reminders: [
      {
        id: 'rem-3',
        type: 'offset',
        offsetDays: 5,
        calendarAccountIds: [],
        status: 'scheduled'
      }
    ],
    calendarEventIds: [],
    calendarAccountIds: [],
    status: 'active',
    createdAt: '2026-09-27T14:00:00Z',
    updatedAt: '2026-09-27T14:00:00Z'
  }
];

