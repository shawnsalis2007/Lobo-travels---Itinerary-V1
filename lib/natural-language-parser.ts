import { 
  Itinerary, 
  ItineraryDay, 
  Destination, 
  Attraction, 
  Hotel, 
  VehicleOption, 
  AppSettings, 
  HotelStarTier,
  DayHotelSelection,
  DayHotelTiers,
  PricingTiers,
  CostBreakdown
} from '@/types';
import { generateAutoDayDescription } from '@/lib/narrative-generator';
import { INTERCITY_ROUTES } from '@/lib/catalog-data';

export interface ParsedPromptParams {
  rawPrompt: string;
  destinations: string[];
  daysCount: number;
  nights: number;
  hotelStarTier: HotelStarTier;
  includeHotels: boolean;
  hotelTiersEnabled: boolean;
  selectedAttractions: Attraction[];
  adults: number;
  children: number;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleCategory: string;
  vehicleDisplay: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  tourName: string;
}

export interface ParserContext {
  destinations: Destination[];
  attractions: Attraction[];
  hotels: Hotel[];
  vehicles: VehicleOption[];
  settings?: AppSettings;
}

// Popular Circuit Destination Mapping
const CIRCUIT_PRESETS: Record<string, string[]> = {
  'golden triangle': ['Delhi', 'Agra', 'Jaipur'],
  'golden triangle tour': ['Delhi', 'Agra', 'Jaipur'],
  'delhi agra jaipur': ['Delhi', 'Agra', 'Jaipur'],
  'delhi jaipur agra': ['Delhi', 'Jaipur', 'Agra'],
  'himachal': ['Shimla', 'Manali'],
  'himachal pradesh': ['Shimla', 'Manali'],
  'shimla manali': ['Shimla', 'Manali'],
  'kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam'],
  'srinagar gulmarg pahalgam': ['Srinagar', 'Gulmarg', 'Pahalgam'],
  'royal rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'udaipur mount abu': ['Udaipur', 'Mount Abu'],
  'mount abu udaipur': ['Mount Abu', 'Udaipur'],
  'mathura vrindavan agra': ['Delhi', 'Mathura & Vrindavan', 'Agra'],
  'rishikesh haridwar': ['Rishikesh', 'Haridwar'],
  'kerala': ['Kerala (Munnar & Alleppey)'],
  'amritsar': ['Amritsar'],
  'varanasi': ['Varanasi'],
  'goa': ['Goa']
};

/**
 * Client-Side Zero-Cost Natural Language Prompt Parser
 * Extracts tour parameters from natural language prompts in <10ms without any external API calls.
 */
export function parseNaturalLanguagePrompt(
  prompt: string,
  context: ParserContext
): ParsedPromptParams {
  const p = prompt.trim();
  const lower = p.toLowerCase();

  // 1. DESTINATIONS EXTRACTION
  let matchedDests: string[] = [];

  // Check circuit keywords first
  for (const [circuitKey, circuitCities] of Object.entries(CIRCUIT_PRESETS)) {
    if (lower.includes(circuitKey)) {
      matchedDests = [...circuitCities];
      break;
    }
  }

  // If no circuit matched, scan individual destinations
  if (matchedDests.length === 0) {
    // Sort destinations by length descending so "Mount Abu" matches before "Abu", etc.
    const sortedDests = [...context.destinations].sort((a, b) => b.name.length - a.name.length);
    const foundIndices: { dest: string; index: number }[] = [];

    for (const d of sortedDests) {
      const dNameLower = d.name.toLowerCase();
      // Also match base name if contains parentheses, e.g. "Kerala (Munnar & Alleppey)" -> "kerala"
      const baseName = dNameLower.split('(')[0].trim();
      
      const idx1 = lower.indexOf(dNameLower);
      const idx2 = baseName.length >= 3 ? lower.indexOf(baseName) : -1;
      
      const matchIdx = idx1 !== -1 ? idx1 : idx2;
      if (matchIdx !== -1) {
        // Prevent duplicate sub-matches
        const alreadyCovered = foundIndices.some(f => Math.abs(f.index - matchIdx) < 4);
        if (!alreadyCovered) {
          foundIndices.push({ dest: d.name, index: matchIdx });
        }
      }
    }

    // Sort by position of appearance in prompt
    foundIndices.sort((a, b) => a.index - b.index);
    matchedDests = foundIndices.map(f => f.dest);
  }

  // Fallback destination if none detected
  if (matchedDests.length === 0) {
    if (lower.includes('safari') || lower.includes('jhalana') || lower.includes('pink city')) {
      matchedDests = ['Jaipur'];
    } else if (lower.includes('taj') || lower.includes('mughal')) {
      matchedDests = ['Agra'];
    } else if (lower.includes('snow') || lower.includes('atal') || lower.includes('solang') || lower.includes('rohtang')) {
      matchedDests = ['Manali'];
    } else if (lower.includes('dilwara') || lower.includes('nakki') || lower.includes('abu')) {
      matchedDests = ['Mount Abu'];
    } else if (lower.includes('pichola') || lower.includes('lake') || lower.includes('fatehsagar')) {
      matchedDests = ['Udaipur'];
    } else {
      matchedDests = ['Delhi'];
    }
  }

  // 2. DURATION (DAYS & NIGHTS)
  let daysCount = 0;
  let nights = 0;

  // Patterns like "4 nights / 5 days", "4n 5d", "5 days", "3-day", "2 nights"
  const daysMatch = lower.match(/(\d+)\s*[- ]?(?:days?|d)\b/);
  const nightsMatch = lower.match(/(\d+)\s*[- ]?(?:nights?|n)\b/);

  if (daysMatch) {
    daysCount = parseInt(daysMatch[1], 10);
  }
  if (nightsMatch) {
    nights = parseInt(nightsMatch[1], 10);
  }

  if (daysCount > 0 && nights === 0) {
    nights = Math.max(1, daysCount - 1);
  } else if (nights > 0 && daysCount === 0) {
    daysCount = nights + 1;
  }

  // Named durations
  if (daysCount === 0) {
    if (lower.includes('long weekend')) {
      daysCount = 3;
      nights = 2;
    } else if (lower.includes('weekend')) {
      daysCount = 2;
      nights = 1;
    } else if (lower.includes('week') || lower.includes('7-day')) {
      daysCount = 7;
      nights = 6;
    } else {
      // Intelligent fallback based on destination count
      if (matchedDests.length === 1) {
        daysCount = 3;
        nights = 2;
      } else if (matchedDests.length === 2) {
        daysCount = 4;
        nights = 3;
      } else if (matchedDests.length >= 3) {
        daysCount = Math.max(5, matchedDests.length + 1);
        nights = daysCount - 1;
      } else {
        daysCount = 3;
        nights = 2;
      }
    }
  }

  // Clamp daysCount between 1 and 15
  daysCount = Math.max(1, Math.min(15, daysCount));
  nights = Math.max(0, daysCount - 1);

  // 3. HOTEL STAR TIER & INCLUSION
  let hotelStarTier: HotelStarTier = '4_star';
  let includeHotels = true;
  let hotelTiersEnabled = false;

  if (/(?:no\s+hotel|without\s+hotel|hotel\s+not\s+required|only\s+cab|cab\s+only|vehicle\s+only|car\s+only)/i.test(lower)) {
    includeHotels = false;
  } else if (/(?:5[- ]?star|five[- ]?star|luxury|palace|heritage\s+luxury|5\s*★)/i.test(lower)) {
    hotelStarTier = '5_star';
  } else if (/(?:3[- ]?star|three[- ]?star|comfort|budget|standard|3\s*★)/i.test(lower)) {
    hotelStarTier = '3_star';
  } else if (/(?:4[- ]?star|four[- ]?star|deluxe|premium|4\s*★)/i.test(lower)) {
    hotelStarTier = '4_star';
  }

  if (/(?:tier|options?|compare|multi[- ]tier|all\s+tiers|star\s+options)/i.test(lower)) {
    hotelTiersEnabled = true;
  }

  // 4. ATTRACTIONS MATCHING
  const selectedAttractions: Attraction[] = [];
  const addedAttrIds = new Set<string>();

  // Keyword to attraction aliases mapping
  const ATTRACTION_KEYWORD_MAP: { regex: RegExp; keywords: string[] }[] = [
    { regex: /jhalana|leopard\s*safari/i, keywords: ['jhalana'] },
    { regex: /taj\s*mahal|sunrise\s*taj/i, keywords: ['taj-mahal', 'taj mahal'] },
    { regex: /atal\s*tunnel/i, keywords: ['atal-tunnel', 'atal tunnel'] },
    { regex: /solang(?:\s*valley)?/i, keywords: ['solang'] },
    { regex: /rohtang(?:\s*pass)?/i, keywords: ['rohtang'] },
    { regex: /hadimba(?:\s*devi|\s*temple)?/i, keywords: ['hadimba'] },
    { regex: /amber\s*fort|amer\s*fort/i, keywords: ['amber-fort', 'amber fort'] },
    { regex: /hawa\s*mahal/i, keywords: ['hawa-mahal', 'hawa mahal'] },
    { regex: /city\s*palace/i, keywords: ['city-palace', 'city palace'] },
    { regex: /jantar\s*mantar/i, keywords: ['jantar-mantar', 'jantar mantar'] },
    { regex: /chokhi\s*dhani/i, keywords: ['chokhi-dhani', 'chokhi dhani'] },
    { regex: /nahargarh(?:\s*fort)?/i, keywords: ['nahargarh'] },
    { regex: /jaigarh(?:\s*fort)?/i, keywords: ['jaigarh'] },
    { regex: /pichola|lake\s*pichola/i, keywords: ['pichola'] },
    { regex: /saheliyon(?:\s*ki\s*bari)?/i, keywords: ['saheliyon'] },
    { regex: /dilwara(?:\s*temple)?/i, keywords: ['dilwara'] },
    { regex: /nakki(?:\s*lake)?/i, keywords: ['nakki'] },
    { regex: /guru\s*shikhar/i, keywords: ['guru-shikhar', 'guru shikhar'] },
    { regex: /qutub(?:\s*minar)?|qutab(?:\s*minar)?/i, keywords: ['qutub'] },
    { regex: /india\s*gate/i, keywords: ['india-gate', 'india gate'] },
    { regex: /humayun(?:\s*tomb)?/i, keywords: ['humayun'] },
    { regex: /red\s*fort/i, keywords: ['red-fort', 'red fort'] },
    { regex: /lotus\s*temple/i, keywords: ['lotus-temple', 'lotus temple'] },
    { regex: /akshardham(?:\s*temple)?/i, keywords: ['akshardham'] },
    { regex: /rashtrapati(?:\s*bhavan)?/i, keywords: ['rashtrapati'] },
    { regex: /agra\s*fort/i, keywords: ['agra-fort', 'agra fort'] },
    { regex: /fatehpur(?:\s*sikri)?|buland\s*darwaza/i, keywords: ['fatehpur', 'buland'] },
    { regex: /mehtab\s*bagh/i, keywords: ['mehtab'] },
    { regex: /golden\s*temple|harmandir(?:\s*sahib)?/i, keywords: ['golden-temple', 'golden temple', 'harmandir'] },
    { regex: /wagah(?:\s*border)?/i, keywords: ['wagah'] },
    { regex: /shikara|dal\s*lake/i, keywords: ['shikara', 'dal-lake', 'dal lake'] },
    { regex: /gondola|cable\s*car/i, keywords: ['gondola'] },
    { regex: /baisaran|betaab(?:\s*valley)?/i, keywords: ['betaab', 'baisaran'] },
    { regex: /ganga\s*aarti|triveni(?:\s*ghat)?/i, keywords: ['ganga-aarti', 'triveni'] },
    { regex: /rafting|river\s*rafting/i, keywords: ['rafting'] },
    { regex: /tiger\s*safari|ranthambore\s*fort/i, keywords: ['ranthambore', 'tiger'] },
    { regex: /mehrangarh(?:\s*fort)?/i, keywords: ['mehrangarh'] },
    { regex: /jaswant\s*thada/i, keywords: ['jaswant-thada', 'jaswant'] },
    { regex: /umaid\s*bhawan/i, keywords: ['umaid-bhawan', 'umaid'] },
    { regex: /sam\s*sand\s*dunes|desert\s*safari/i, keywords: ['sam-sand', 'sand-dunes', 'desert'] }
  ];

  for (const mapping of ATTRACTION_KEYWORD_MAP) {
    if (mapping.regex.test(lower)) {
      // Find matching attraction in context
      const match = context.attractions.find(a => {
        const idLower = a.id.toLowerCase();
        const nameLower = a.name.toLowerCase();
        return mapping.keywords.some(k => idLower.includes(k) || nameLower.includes(k));
      });
      if (match && !addedAttrIds.has(match.id)) {
        selectedAttractions.push(match);
        addedAttrIds.add(match.id);
      }
    }
  }

  // Also directly check any attraction name in catalog
  for (const a of context.attractions) {
    if (!addedAttrIds.has(a.id) && a.name.length >= 4) {
      if (lower.includes(a.name.toLowerCase())) {
        selectedAttractions.push(a);
        addedAttrIds.add(a.id);
      }
    }
  }

  // 5. PAX (ADULTS, CHILDREN)
  let adults = 2;
  let children = 0;

  if (lower.includes('solo') || lower.includes('1 pax') || lower.includes('1 adult') || lower.includes('1 person')) {
    adults = 1;
    children = 0;
  } else if (lower.includes('couple') || lower.includes('2 adults') || lower.includes('2 pax')) {
    adults = 2;
    children = 0;
  } else {
    const adultsMatch = lower.match(/(\d+)\s*(?:adults?|pax|people|persons?|guests?)\b/);
    if (adultsMatch) {
      adults = parseInt(adultsMatch[1], 10);
    }
    const kidsMatch = lower.match(/(\d+)\s*(?:kids?|children|child)\b/);
    if (kidsMatch) {
      children = parseInt(kidsMatch[1], 10);
    }
    const familyMatch = lower.match(/family\s+of\s+(\d+)/);
    if (familyMatch) {
      const famTotal = parseInt(familyMatch[1], 10);
      adults = Math.min(famTotal, 2);
      children = Math.max(0, famTotal - adults);
    }
  }

  adults = Math.max(1, adults);
  children = Math.max(0, children);
  const totalPax = adults + children;

  // 6. VEHICLE SELECTION
  let vehicleBrand = 'Kia';
  let vehicleModel = 'Carens';
  let vehicleCategory = 'MUV';
  let vehicleDisplay = 'Kia Carens – Private Air-Conditioned MUV';

  if (/(?:hycross|innova\s+hycross)/i.test(lower)) {
    vehicleBrand = 'Toyota';
    vehicleModel = 'Innova Hycross';
    vehicleCategory = 'MUV';
    vehicleDisplay = 'Toyota Innova Hycross – Premium Hybrid MUV';
  } else if (/(?:crysta|innova\s+crysta|innova)/i.test(lower)) {
    vehicleBrand = 'Toyota';
    vehicleModel = 'Innova Crysta';
    vehicleCategory = 'MUV';
    vehicleDisplay = 'Toyota Innova Crysta – Private Air-Conditioned MUV';
  } else if (/carens/i.test(lower)) {
    vehicleBrand = 'Kia';
    vehicleModel = 'Carens';
    vehicleCategory = 'MUV';
    vehicleDisplay = 'Kia Carens – Private Air-Conditioned MUV';
  } else if (/ertiga/i.test(lower)) {
    vehicleBrand = 'Maruti Suzuki';
    vehicleModel = 'Ertiga';
    vehicleCategory = 'MUV';
    vehicleDisplay = 'Maruti Suzuki Ertiga – Air-Conditioned MUV';
  } else if (/(?:dzire|sedan)/i.test(lower)) {
    vehicleBrand = 'Maruti Suzuki';
    vehicleModel = 'Dzire';
    vehicleCategory = 'Sedan';
    vehicleDisplay = 'Maruti Suzuki Dzire – Private Air-Conditioned Sedan';
  } else if (/(?:tempo|traveller|urbania|12[- ]seater|16[- ]seater)/i.test(lower)) {
    vehicleBrand = 'Tempo Traveller / Force';
    vehicleModel = 'Force Urbania Luxury (12-Seater)';
    vehicleCategory = 'Tempo Traveller';
    vehicleDisplay = 'Force Urbania Luxury (12-Seater) – Chauffeur Driven Executive Coach';
  } else if (/(?:mercedes|luxury\s*car|bmw|audi)/i.test(lower)) {
    vehicleBrand = 'Mercedes-Benz';
    vehicleModel = 'E-Class Sedan';
    vehicleCategory = 'Luxury';
    vehicleDisplay = 'Mercedes-Benz E-Class – Chauffeur Driven Luxury Sedan';
  } else if (/fortuner/i.test(lower)) {
    vehicleBrand = 'Toyota';
    vehicleModel = 'Fortuner';
    vehicleCategory = 'SUV';
    vehicleDisplay = 'Toyota Fortuner – Luxury 4x4 SUV';
  } else {
    // Intelligent default based on total pax
    if (totalPax <= 2) {
      vehicleBrand = 'Kia';
      vehicleModel = 'Carens';
      vehicleCategory = 'MUV';
      vehicleDisplay = 'Kia Carens – Private Air-Conditioned MUV';
    } else if (totalPax <= 4) {
      vehicleBrand = 'Kia';
      vehicleModel = 'Carens';
      vehicleCategory = 'MUV';
      vehicleDisplay = 'Kia Carens – Private Air-Conditioned MUV';
    } else if (totalPax <= 6) {
      vehicleBrand = 'Toyota';
      vehicleModel = 'Innova Crysta';
      vehicleCategory = 'MUV';
      vehicleDisplay = 'Toyota Innova Crysta – Private Air-Conditioned MUV';
    } else {
      vehicleBrand = 'Tempo Traveller / Force';
      vehicleModel = 'Force Urbania Luxury (12-Seater)';
      vehicleCategory = 'Tempo Traveller';
      vehicleDisplay = 'Force Urbania Luxury (12-Seater) – Executive Coach';
    }
  }

  // 7. CLIENT NAME
  let clientName: string | undefined = undefined;
  const nameMatch = lower.match(/(?:for\s+(?:mr\.?|mrs\.?|ms\.?|dr\.?)?\s*|client\s*(?:name)?\s*(?:is|:)?\s*)([a-z]+(?:\s+[a-z]+)?)/i);
  if (nameMatch && nameMatch[1]) {
    const rawName = nameMatch[1].trim();
    // Capitalize words
    clientName = rawName.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // 8. DATES
  let startDate: string | undefined = undefined;
  let endDate: string | undefined = undefined;

  // Check for ISO dates like 2026-11-15
  const isoDateMatch = prompt.match(/\b(202[5-9]-\d{2}-\d{2})\b/);
  if (isoDateMatch) {
    startDate = isoDateMatch[1];
  } else {
    // Fallback: Default to a tentative date 7 days from today
    const now = new Date();
    const dStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    startDate = dStart.toISOString().split('T')[0];
  }

  if (startDate) {
    const s = new Date(startDate);
    const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + (daysCount - 1));
    endDate = e.toISOString().split('T')[0];
  }

  // 9. TOUR NAME GENERATION
  let tourName = '';
  const starLabel = hotelStarTier === '5_star' ? 'Luxury ' : hotelStarTier === '3_star' ? 'Comfort ' : '';
  const primaryDest = matchedDests[0];
  
  if (matchedDests.length === 1) {
    const topSight = selectedAttractions[0]?.name;
    if (topSight && !topSight.toLowerCase().includes(primaryDest.toLowerCase())) {
      tourName = `${daysCount}-Day ${starLabel}${primaryDest} Tour with ${topSight}`;
    } else {
      tourName = `${daysCount}-Day ${starLabel}${primaryDest} Heritage & Sightseeing Tour`;
    }
  } else if (matchedDests.length === 2) {
    tourName = `${daysCount}-Day ${starLabel}${matchedDests.join(' & ')} Private Tour`;
  } else if (matchedDests.length === 3 && matchedDests.includes('Delhi') && matchedDests.includes('Agra') && matchedDests.includes('Jaipur')) {
    tourName = `${daysCount}-Day ${starLabel}Golden Triangle Tour – Delhi, Agra & Jaipur`;
  } else {
    tourName = `${daysCount}-Day ${starLabel}${matchedDests.slice(0, 3).join(', ')} Tour`;
  }

  return {
    rawPrompt: prompt,
    destinations: matchedDests,
    daysCount,
    nights,
    hotelStarTier,
    includeHotels,
    hotelTiersEnabled,
    selectedAttractions,
    adults,
    children,
    vehicleBrand,
    vehicleModel,
    vehicleCategory,
    vehicleDisplay,
    clientName,
    startDate,
    endDate,
    tourName
  };
}

/**
 * Generates a fully populated, ready-to-use Itinerary object from a natural language prompt.
 */
export function generateItineraryFromPrompt(
  prompt: string,
  context: ParserContext
): {
  itinerary: Itinerary;
  params: ParsedPromptParams;
} {
  const params = parseNaturalLanguagePrompt(prompt, context);
  const {
    destinations,
    daysCount,
    nights,
    hotelStarTier,
    includeHotels,
    hotelTiersEnabled,
    selectedAttractions,
    adults,
    children,
    vehicleBrand,
    vehicleModel,
    vehicleCategory,
    vehicleDisplay,
    clientName,
    startDate,
    endDate,
    tourName
  } = params;

  const totalPax = adults + children;
  const paxSummary = children > 0 
    ? `${adults} Adults + ${children} Child${children > 1 ? 'ren' : ''}`
    : `${adults} Adults`;

  const uniqueId = 'itn-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const nextRef = `${context.settings?.referencePrefix || 'LT-2026-'}0001`;

  // Distribute destinations across daysCount
  const days: ItineraryDay[] = [];
  const assignedAttractionIds = new Set<string>();

  // Determine destination per day
  const destSchedule: string[] = [];
  if (destinations.length === 1) {
    for (let i = 0; i < daysCount; i++) {
      destSchedule.push(destinations[0]);
    }
  } else if (destinations.length === 2) {
    const half = Math.ceil(daysCount / 2);
    for (let i = 0; i < daysCount; i++) {
      destSchedule.push(i < half ? destinations[0] : destinations[1]);
    }
  } else {
    // 3 or more destinations
    const perDest = Math.max(1, Math.floor(daysCount / destinations.length));
    let currentIdx = 0;
    for (let i = 0; i < daysCount; i++) {
      const dIndex = Math.min(destinations.length - 1, Math.floor(i / perDest));
      destSchedule.push(destinations[dIndex]);
    }
  }

  // Pre-filter catalog attractions by destination for filling gaps
  const getCatalogAttractionsForDest = (destName: string) => {
    return context.attractions.filter(
      a => a.destinationName.toLowerCase() === destName.toLowerCase()
    );
  };

  // Find hotels in city matching star category
  const findHotelForCityAndTier = (city: string, targetStars: number): DayHotelSelection | undefined => {
    const cityLower = city.toLowerCase();
    const cityHotels = context.hotels.filter(h => h.city.toLowerCase() === cityLower);
    
    // Exact star match first
    let matched = cityHotels.find(h => h.starCategory === targetStars);
    // Closest match
    if (!matched && cityHotels.length > 0) {
      matched = cityHotels[0];
    }
    // Fallback: any hotel with that star rating
    if (!matched) {
      matched = context.hotels.find(h => h.starCategory === targetStars);
    }
    if (!matched && context.hotels.length > 0) {
      matched = context.hotels[0];
    }

    if (!matched) return undefined;

    return {
      hotelId: matched.id,
      name: matched.name,
      city: matched.city,
      roomCategory: matched.roomCategories[0] || (targetStars === 5 ? 'Luxury Suite' : 'Deluxe Room'),
      mealPlan: matched.mealPlans[0] || 'Breakfast Included (CP)',
      starCategory: matched.starCategory,
      address: matched.address
    };
  };

  for (let i = 0; i < daysCount; i++) {
    const dayNum = i + 1;
    const currentDest = destSchedule[i];
    const nextDest = i < daysCount - 1 ? destSchedule[i + 1] : currentDest;
    const isChangingDest = currentDest.toLowerCase() !== nextDest.toLowerCase();
    const overnightCity = isChangingDest ? nextDest : currentDest;

    // Pick attractions for this day
    const dayAttractionIds: string[] = [];
    const dayAttractionNames: string[] = [];
    const dayImages: string[] = [];

    // First: add explicitly requested attractions matching this destination
    for (const att of selectedAttractions) {
      if (
        !assignedAttractionIds.has(att.id) &&
        (att.destinationName.toLowerCase() === currentDest.toLowerCase() || destinations.length === 1)
      ) {
        dayAttractionIds.push(att.id);
        dayAttractionNames.push(att.name);
        if (att.image && !dayImages.includes(att.image)) {
          dayImages.push(att.image);
        }
        assignedAttractionIds.add(att.id);
        if (dayAttractionIds.length >= 3) break;
      }
    }

    // Second: fill remaining slots with top authentic catalog attractions for this destination
    if (dayAttractionIds.length < 3) {
      const topDestAttractions = getCatalogAttractionsForDest(currentDest);
      for (const att of topDestAttractions) {
        if (!assignedAttractionIds.has(att.id) && dayAttractionIds.length < 3) {
          dayAttractionIds.push(att.id);
          dayAttractionNames.push(att.name);
          if (att.image && !dayImages.includes(att.image)) {
            dayImages.push(att.image);
          }
          assignedAttractionIds.add(att.id);
        }
      }
    }

    // Day Title
    let dayTitle = `Day ${dayNum} Sightseeing`;
    if (dayNum === 1) {
      dayTitle = `Arrival in ${currentDest} & Welcome Orientation`;
    } else if (dayNum === daysCount) {
      dayTitle = `${currentDest} Sightseeing & Departure Transfer`;
    } else if (isChangingDest) {
      dayTitle = `${currentDest} Sightseeing & Scenic Drive to ${nextDest}`;
    } else if (dayAttractionNames.length > 0) {
      dayTitle = `${currentDest} Sightseeing – ${dayAttractionNames.slice(0, 2).join(' & ')}`;
    }

    // Build Day Object
    const dayObj: ItineraryDay = {
      id: 'day-' + Date.now() + '-' + dayNum,
      dayNumber: dayNum,
      title: dayTitle,
      destination: currentDest,
      attractionIds: dayAttractionIds,
      attractionNames: dayAttractionNames,
      description: '',
      isOvernightSameLocation: !isChangingDest,
      overnightLocation: overnightCity,
      meals: {
        breakfast: dayNum > 1,
        lunch: false,
        dinner: false,
        note: dayNum > 1 ? 'Buffet Breakfast at Hotel' : ''
      },
      images: dayImages
    };

    // Day 1 Arrival Details
    if (dayNum === 1) {
      dayObj.arrivalDetails = {
        enabled: true,
        point: 'Airport',
        flightOrTrainNumber: 'IndiGo 6E-204',
        arrivalTime: '09:30 AM',
        includeHotelCheckIn: true,
        checkInTiming: 'before_sightseeing'
      };
    }

    // Final Day Departure Details
    if (dayNum === daysCount) {
      dayObj.departureDetails = {
        enabled: true,
        point: 'Airport',
        departureTime: '18:30 PM',
        dropLocation: currentDest
      };
    }

    // Inter-city transfer if destination changes
    if (isChangingDest) {
      const routeKey = `${currentDest.toLowerCase()}-${nextDest.toLowerCase()}`.replace(/\s+/g, '-');
      const routeData = INTERCITY_ROUTES[routeKey];
      dayObj.transfer = {
        from: currentDest,
        to: nextDest,
        distanceKm: routeData?.distanceKm || 220,
        driveTime: routeData?.driveTime || '4–5 Hours',
        description: `Commence your comfortable highway drive from ${currentDest} to ${nextDest}.`
      };
    }

    // Hotel Selection for overnightCity
    if (includeHotels) {
      const threeStarHotel = findHotelForCityAndTier(overnightCity, 3);
      const fourStarHotel = findHotelForCityAndTier(overnightCity, 4);
      const fiveStarHotel = findHotelForCityAndTier(overnightCity, 5);

      dayObj.hotelTiers = {
        threeStar: threeStarHotel,
        fourStar: fourStarHotel,
        fiveStar: fiveStarHotel
      };

      // Set active hotel matching selected tier
      if (hotelStarTier === '3_star') {
        dayObj.hotel = threeStarHotel;
      } else if (hotelStarTier === '5_star') {
        dayObj.hotel = fiveStarHotel;
      } else {
        dayObj.hotel = fourStarHotel;
      }
    }

    // Generate formatted narrative description
    dayObj.description = generateAutoDayDescription(dayObj, i, daysCount, includeHotels);

    days.push(dayObj);
  }

  // Cover Image from primary destination or top attraction
  let coverImage = '';
  const firstAttrWithImg = selectedAttractions.find(a => a.image);
  if (firstAttrWithImg?.image) {
    coverImage = firstAttrWithImg.image;
  } else {
    const primaryCatalogDest = context.destinations.find(
      d => d.name.toLowerCase() === destinations[0].toLowerCase()
    );
    coverImage = primaryCatalogDest?.heroImage || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80';
  }

  // PRICING CALCULATION
  // Realistic rates in INR
  const vehicleDailyRate = vehicleCategory === 'Luxury' ? 12000 :
    vehicleCategory === 'Tempo Traveller' ? 7500 :
    vehicleCategory === 'SUV' ? 5500 :
    vehicleCategory === 'MUV' ? 4500 : 3500;

  const transportRate = vehicleDailyRate * daysCount;

  // Accommodation Rate per night based on star tier
  const roomCount = Math.ceil(totalPax / 2);
  const nightlyRate3Star = 3800 * roomCount;
  const nightlyRate4Star = 5800 * roomCount;
  const nightlyRate5Star = 10500 * roomCount;

  const accom3Star = includeHotels ? nightlyRate3Star * nights : 0;
  const accom4Star = includeHotels ? nightlyRate4Star * nights : 0;
  const accom5Star = includeHotels ? nightlyRate5Star * nights : 0;

  const sightseeingAndGuide = Math.round(daysCount * 1200);

  const pricingTiers: PricingTiers = {
    threeStar: {
      totalCost: transportRate + accom3Star + sightseeingAndGuide,
      transportCost: transportRate,
      accommodationCost: accom3Star
    },
    fourStar: {
      totalCost: transportRate + accom4Star + sightseeingAndGuide,
      transportCost: transportRate,
      accommodationCost: accom4Star
    },
    fiveStar: {
      totalCost: transportRate + accom5Star + sightseeingAndGuide,
      transportCost: transportRate,
      accommodationCost: accom5Star
    }
  };

  const activePricing = pricingTiers[
    hotelStarTier === '5_star' ? 'fiveStar' : hotelStarTier === '3_star' ? 'threeStar' : 'fourStar'
  ]!;

  const totalCost = activePricing.totalCost;
  const accommodationRate = activePricing.accommodationCost || 0;

  const costBreakdown: CostBreakdown = {
    vehicle: transportRate,
    accommodation: accommodationRate,
    sightseeing: Math.round(sightseeingAndGuide * 0.6),
    guide: Math.round(sightseeingAndGuide * 0.4),
    transfers: 0,
    taxes: 0
  };

  const itinerary: Itinerary = {
    id: uniqueId,
    referenceNumber: nextRef,
    tourName,
    clientName: clientName || '',
    clientPhone: '',
    clientEmail: '',
    datesNotConfirmed: false,
    startDate: startDate || '2026-10-20',
    endDate: endDate || '2026-10-24',
    durationText: `${nights} Nights / ${daysCount} Days`,
    nights,
    daysCount,
    adults,
    children,
    childrenDetails: [],
    totalPax,
    paxSummary,
    vehicleBrand,
    vehicleModel,
    vehicleCategory,
    vehicleDisplay,
    includeHotels,
    hotelTiersEnabled,
    selectedHotelTier: hotelStarTier,
    pricingTiers,
    itemizedPriceSplit: false,
    transportRate,
    accommodationRate,
    showCostInItinerary: true,
    costDisplayType: 'total_only',
    currency: 'INR',
    currencySymbol: '₹',
    totalCost,
    costBreakdown,
    advancePaid: 0,
    pendingAmount: totalCost,
    paymentStatus: 'Unpaid',
    inclusions: [
      `Private air-conditioned ${vehicleBrand} ${vehicleModel} throughout the tour`,
      includeHotels ? `Hotel Accommodation (${hotelStarTier.replace('_', '-')} category) for ${nights} Nights` : 'Sightseeing cab & driver allowance',
      'Daily breakfast as per hotel plan',
      'Dedicated experienced chauffeur throughout the itinerary',
      'All toll taxes, parking fees, interstate road permits, and fuel allowances',
      'Sightseeing and transfers as per itinerary'
    ],
    exclusions: [
      'Monument / attraction entrance permits and camera tickets',
      'Lunches, dinners, and personal beverages',
      'Airfare and railway tickets (unless explicitly confirmed)',
      'Guide fees at monuments (available on direct payment)',
      'Travel insurance and personal expenses'
    ],
    specialNotes: 'All monuments and attractions are subject to local timing guidelines. Valid government-issued photo ID is required for hotel check-ins.',
    coverImage,
    flightBookings: {
      flightsBookedByUs: false,
      flights: []
    },
    status: 'Draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    days
  };

  return {
    itinerary,
    params
  };
}
