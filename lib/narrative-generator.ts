import { ItineraryDay, DayArrivalDetails, DayDepartureDetails } from '@/types';

/**
 * Formats inbound arrival logistics narrative text dynamically matching transport mode:
 * - Flight: 'Upon arrival at [Airport Name] (Flight [Number]) at [Time]...'
 * - Railway / Train: 'Upon arrival at [Railway Station] (Train [Number]) at [Time]...'
 * - Bus: 'Upon arrival at [Bus Stand/Location] (Bus [Details]) at [Time]...'
 */
export function formatArrivalLogisticsNarrative(arr: DayArrivalDetails, city: string): string {
  const isTransfer = arr.point === 'Hotel Pickup' || arr.point === 'City Center' || arr.point === 'Other';
  if (isTransfer) {
    const loc = arr.pickupLocation?.trim() || (arr.point === 'Hotel Pickup' ? 'your designated hotel' : arr.point === 'City Center' ? 'the city center' : 'your specified pick-up location');
    const timeStr = arr.arrivalTime?.trim() ? ` at ${arr.arrivalTime.trim()}` : '';
    return `• Welcome to ${city}! Meet and greet with our representative and private chauffeur upon pick-up from ${loc}${timeStr}.`;
  }

  const mode: 'flight' | 'train' | 'bus' =
    arr.transitType ||
    (arr.point === 'Railway Station' ? 'train' : arr.point === 'Bus Terminal' ? 'bus' : 'flight');

  const timeStr = arr.arrivalTime?.trim() ? ` at ${arr.arrivalTime.trim()}` : '';

  if (mode === 'train') {
    let stationName = city ? `${city} Railway Station` : 'the railway station';
    if (arr.pickupLocation?.trim()) {
      const customLoc = arr.pickupLocation.trim();
      stationName = /station/i.test(customLoc) ? customLoc : `${customLoc} Railway Station`;
    }
    let trainDetails = '';
    if (arr.flightOrTrainNumber?.trim()) {
      const raw = arr.flightOrTrainNumber.trim();
      const cleanNum = raw.replace(/^(train|flight|bus)\s*/i, '').trim();
      trainDetails = cleanNum ? ` (Train ${cleanNum})` : ` (${raw})`;
    }
    return `• Welcome to ${city}! Upon arrival at ${stationName}${trainDetails}${timeStr}, meet and greet with our representative and private chauffeur.`;
  }

  if (mode === 'bus') {
    let busLocation = city ? `${city} Bus Stand` : 'the bus stand';
    if (arr.pickupLocation?.trim()) {
      const customLoc = arr.pickupLocation.trim();
      busLocation = /(bus|stand|terminal|isbt)/i.test(customLoc) ? customLoc : `${customLoc} Bus Stand`;
    } else if (arr.point === 'Bus Terminal') {
      busLocation = city ? `${city} Bus Terminal` : 'the bus terminal';
    }
    let busDetails = '';
    if (arr.flightOrTrainNumber?.trim()) {
      const raw = arr.flightOrTrainNumber.trim();
      const cleanNum = raw.replace(/^(bus|flight|train)\s*/i, '').trim();
      busDetails = cleanNum ? ` (Bus ${cleanNum})` : ` (${raw})`;
    }
    return `• Welcome to ${city}! Upon arrival at ${busLocation}${busDetails}${timeStr}, meet and greet with our representative and private chauffeur.`;
  }

  // Default: Flight
  let airportName = city ? `${city} Airport` : 'the airport';
  if (arr.pickupLocation?.trim()) {
    const customLoc = arr.pickupLocation.trim();
    airportName = /airport/i.test(customLoc) ? customLoc : `${customLoc} Airport`;
  }
  let flightDetails = '';
  if (arr.flightOrTrainNumber?.trim()) {
    const raw = arr.flightOrTrainNumber.trim();
    const cleanNum = raw.replace(/^(flight|train|bus)\s*/i, '').trim();
    flightDetails = cleanNum ? ` (Flight ${cleanNum})` : ` (${raw})`;
  }
  return `• Welcome to ${city}! Upon arrival at ${airportName}${flightDetails}${timeStr}, meet and greet with our representative and private chauffeur.`;
}

/**
 * Formats outbound departure logistics narrative text dynamically matching transport mode:
 * - Flight: '...transferred to [Airport Name] (Flight [Number]) at [Time]...'
 * - Railway / Train: '...transferred to [Railway Station] (Train [Number]) at [Time]...'
 * - Bus: '...transferred to [Bus Stand/Location] (Bus [Details]) at [Time]...'
 */
export function formatDepartureLogisticsNarrative(
  dep: DayDepartureDetails,
  city: string,
  isMultiCity: boolean = false
): string {
  const isTransfer = dep.point === 'Hotel Drop' || dep.point === 'City Center' || dep.point === 'Other';
  if (isTransfer) {
    const loc = dep.dropLocation?.trim() || (dep.point === 'Hotel Drop' ? 'your designated hotel' : dep.point === 'City Center' ? 'the city center' : 'your specified drop-off location');
    const timeStr = dep.departureTime?.trim() ? ` at ${dep.departureTime.trim()}` : '';
    if (isMultiCity) {
      return `• Later, assisted drop-off at ${loc}${timeStr} for your onward journey home with cherished travel memories.`;
    }
    return `• Later, you will be assisted with drop-off at ${loc}${timeStr} for your onward journey home with cherished memories.`;
  }

  const mode: 'flight' | 'train' | 'bus' =
    dep.transitType ||
    (dep.point === 'Railway Station' ? 'train' : dep.point === 'Bus Terminal' ? 'bus' : 'flight');

  const timeStr = dep.departureTime?.trim() ? ` at ${dep.departureTime.trim()}` : '';
  const prefix = isMultiCity ? '• Later, transfer to' : '• Later, you will be transferred to';
  const memories = isMultiCity ? 'cherished travel memories.' : 'cherished memories.';

  if (mode === 'train') {
    let stationName = city ? `${city} Railway Station` : 'the railway station';
    if (dep.dropLocation?.trim()) {
      const customLoc = dep.dropLocation.trim();
      stationName = /station/i.test(customLoc) ? customLoc : `${customLoc} Railway Station`;
    }
    let trainDetails = '';
    if (dep.flightOrTrainNumber?.trim()) {
      const raw = dep.flightOrTrainNumber.trim();
      const cleanNum = raw.replace(/^(train|flight|bus)\s*/i, '').trim();
      trainDetails = cleanNum ? ` (Train ${cleanNum})` : ` (${raw})`;
    }
    return `${prefix} ${stationName}${trainDetails}${timeStr} for your departure / drop-off and onward journey home with ${memories}`;
  }

  if (mode === 'bus') {
    let busLocation = city ? `${city} Bus Stand` : 'the bus stand';
    if (dep.dropLocation?.trim()) {
      const customLoc = dep.dropLocation.trim();
      busLocation = /(bus|stand|terminal|isbt)/i.test(customLoc) ? customLoc : `${customLoc} Bus Stand`;
    } else if (dep.point === 'Bus Terminal') {
      busLocation = city ? `${city} Bus Terminal` : 'the bus terminal';
    }
    let busDetails = '';
    if (dep.flightOrTrainNumber?.trim()) {
      const raw = dep.flightOrTrainNumber.trim();
      const cleanNum = raw.replace(/^(bus|flight|train)\s*/i, '').trim();
      busDetails = cleanNum ? ` (Bus ${cleanNum})` : ` (${raw})`;
    }
    return `${prefix} ${busLocation}${busDetails}${timeStr} for your departure / drop-off and onward journey home with ${memories}`;
  }

  // Default: Flight
  let airportName = city ? `${city} Airport` : 'the airport';
  if (dep.dropLocation?.trim()) {
    const customLoc = dep.dropLocation.trim();
    airportName = /airport/i.test(customLoc) ? customLoc : `${customLoc} Airport`;
  }
  let flightDetails = '';
  if (dep.flightOrTrainNumber?.trim()) {
    const raw = dep.flightOrTrainNumber.trim();
    const cleanNum = raw.replace(/^(flight|train|bus)\s*/i, '').trim();
    flightDetails = cleanNum ? ` (Flight ${cleanNum})` : ` (${raw})`;
  }
  return `${prefix} ${airportName}${flightDetails}${timeStr} for your departure / drop-off and onward journey home with ${memories}`;
}

/**
 * Dynamically synchronizes day description text when arrival logistics change.
 * Preserves custom sightseeing notes while updating the arrival bullet.
 */
export function syncArrivalDescription(
  currentDescription: string,
  day: ItineraryDay,
  dayIndex: number,
  totalDays?: number,
  includeHotels: boolean = true
): string {
  if (!day.arrivalDetails?.enabled) {
    if (!currentDescription) return '';
    return currentDescription
      .replace(/^[•\-*]?\s*(Welcome to|Upon arrival at|Meet and greet with)[^\n]+(\n|$)/im, '')
      .replace(/\n\n+/g, '\n')
      .trim();
  }

  const city = (day.isMultiCity && day.cities && day.cities.length > 0 ? day.cities[0]?.destination : day.destination) || '';
  const newArrivalBullet = formatArrivalLogisticsNarrative(day.arrivalDetails, city);

  if (!currentDescription || !currentDescription.trim()) {
    return generateAutoDayDescription(day, dayIndex, totalDays, includeHotels);
  }

  const arrivalRegex = /^[•\-*]?\s*(Welcome to|Upon arrival at|Meet and greet with)[^\n]+(\n|$)/im;
  if (arrivalRegex.test(currentDescription)) {
    return currentDescription.replace(arrivalRegex, newArrivalBullet + '\n').replace(/\n\n+/g, '\n').trim();
  }

  return `${newArrivalBullet}\n${currentDescription.trim()}`;
}

/**
 * Dynamically synchronizes day description text when departure logistics change.
 * Preserves custom sightseeing notes while updating the departure bullet.
 */
export function syncDepartureDescription(
  currentDescription: string,
  day: ItineraryDay,
  dayIndex: number,
  totalDays?: number,
  includeHotels: boolean = true
): string {
  if (!day.departureDetails?.enabled) {
    if (!currentDescription) return '';
    return currentDescription
      .replace(/^[•\-*]?\s*(Later,\s+)?(you\s+will\s+be\s+transferred\s+to|transfer\s+to|you\s+will\s+be\s+assisted\s+with\s+drop-off|assisted\s+drop-off|transferred\s+to)[^\n]+(\n|$)/im, '')
      .replace(/\n\n+/g, '\n')
      .trim();
  }

  const city = (day.isMultiCity && day.cities && day.cities.length > 0 ? day.cities[day.cities.length - 1]?.destination : day.destination) || '';
  const newDepartureBullet = formatDepartureLogisticsNarrative(day.departureDetails, city, Boolean(day.isMultiCity));

  if (!currentDescription || !currentDescription.trim()) {
    return generateAutoDayDescription(day, dayIndex, totalDays, includeHotels);
  }

  const departureRegex = /^[•\-*]?\s*(Later,\s+)?(you\s+will\s+be\s+transferred\s+to|transfer\s+to|you\s+will\s+be\s+assisted\s+with\s+drop-off|assisted\s+drop-off|transferred\s+to)[^\n]+(\n|$)/im;
  if (departureRegex.test(currentDescription)) {
    return currentDescription.replace(departureRegex, newDepartureBullet + '\n').replace(/\n\n+/g, '\n').trim();
  }

  const overnightRegex = /\n?\s*•?\s*Overnight\s+stay[^\n.]*\.?/i;
  if (overnightRegex.test(currentDescription)) {
    return currentDescription.replace(overnightRegex, `\n${newDepartureBullet}`);
  }

  return `${currentDescription.trim()}\n${newDepartureBullet}`;
}

// Dynamic Day Sightseeing Narrative Generator
// Generates structured bullet points with attraction sub-points, omitting meals
export function generateAutoDayDescription(
  day: ItineraryDay,
  dayIndex: number,
  totalDays?: number,
  includeHotels: boolean = true
): string {
  const isLastDay = (totalDays !== undefined && dayIndex === totalDays - 1) || Boolean(day.departureDetails?.enabled);
  const isHotelIncluded = includeHotels && !day.excludeHotel;

  // Multi-city sightseeing narrative
  if (day.isMultiCity && day.cities && day.cities.length > 0) {
    const bullets: string[] = [];

    // Day 1 (or any day) arrival check
    if (day.arrivalDetails?.enabled) {
      const arr = day.arrivalDetails;
      const startCity = day.cities[0]?.destination || day.destination || '';
      bullets.push(formatArrivalLogisticsNarrative(arr, startCity));
      
      if (isHotelIncluded && arr.includeHotelCheckIn !== false) {
        if (arr.checkInTiming !== 'after_sightseeing') {
          bullets.push(`• Transfer directly to your hotel in ${startCity} for check-in and leisure time to freshen up before commencing the tour.`);
        }
      }
    }

    day.cities.forEach((city, idx) => {
      const isLast = idx === day.cities!.length - 1;
      const nextCity = day.cities![idx + 1]?.destination || city.driveToNext?.toCity;

      if (city.checkOut) {
        if (city.skipSightseeing && nextCity) {
          bullets.push(`• Morning check-out from hotel in ${city.destination} and proceed directly on your journey to ${nextCity}.`);
        } else {
          bullets.push(`• Morning check-out from hotel in ${city.destination}.`);
        }
      }

      // Only describe sightseeing if NOT skipping sightseeing in this city
      if (!city.skipSightseeing) {
        const isDrivePast = (name: string) => /rashtrapati\s+bhavan.*parliament|parliament.*rashtrapati/i.test(name);
        const rawAttractions = city.attractionNames || [];
        const hasDrivePastRP = rawAttractions.some(isDrivePast);
        const walkingSights = rawAttractions.filter(n => !isDrivePast(n));

        if (walkingSights.length > 0) {
          const sightLines = walkingSights.map(s => `  - ${s}`).join('\n');
          bullets.push(`• In ${city.destination}, proceed for sightseeing visiting:\n${sightLines}`);
        }

        if (hasDrivePastRP) {
          bullets.push(`• Drive past Rashtrapati Bhavan and Parliament.`);
        }
      }

      // Inter-City Transit to next city: Car, Flight, Train, Bus, Cruise, Ferry, Toy Train, or Seaplane
      if (!isLast) {
        const transit = city.transitType || 'car';
        const targetNext = day.cities![idx + 1]?.destination || city.driveToNext?.toCity || 
          (transit === 'flight' ? city.flightToNext?.arrivalCity :
           transit === 'train' ? city.trainToNext?.arrivalStation :
           transit === 'bus' ? city.busToNext?.arrivalStation :
           transit === 'cruise' ? city.cruiseToNext?.arrivalPort :
           transit === 'ferry' ? city.ferryToNext?.arrivalPort :
           transit === 'toy_train' ? city.toyTrainToNext?.arrivalStation :
           transit === 'seaplane' ? city.seaplaneToNext?.arrivalPoint :
           'the next destination');

        if (transit === 'flight') {
          const fl = city.flightToNext;
          if (fl) {
            const airlineStr = fl.airline ? `${fl.airline} ` : '';
            const flightNumStr = fl.flightNumber ? `flight ${airlineStr}${fl.flightNumber}` : 'your domestic flight';
            const depTimeStr = fl.departureTime ? ` departing at ${fl.departureTime}` : '';
            const depPortStr = fl.departureAirport ? ` from ${fl.departureAirport}` : ` from ${city.destination}`;
            const arrPortStr = fl.arrivalAirport ? ` to ${fl.arrivalAirport} (${targetNext})` : ` to ${targetNext}`;
            const arrTimeStr = fl.arrivalTime ? `, arriving at ${fl.arrivalTime}` : '';
            bullets.push(`• Later, transfer to the airport to board ${flightNumStr}${depPortStr}${depTimeStr}${arrPortStr}${arrTimeStr}. Upon arrival, our representative will receive you.`);
          } else {
            bullets.push(`• Later, transfer to the airport to board your domestic flight to ${targetNext}. Upon arrival, our representative will receive you.`);
          }
        } else if (transit === 'train') {
          const tr = city.trainToNext;
          if (tr) {
            const trainStr = tr.trainName || tr.trainNumber ? `the ${tr.trainName || ''} (${tr.trainNumber || ''})` : 'your train';
            const depTimeStr = tr.departureTime ? ` departing at ${tr.departureTime}` : '';
            const depStationStr = tr.departureStation ? ` from ${tr.departureStation}` : ` from ${city.destination}`;
            const arrStationStr = tr.arrivalStation ? ` for ${tr.arrivalStation} (${targetNext})` : ` for ${targetNext}`;
            const arrTimeStr = tr.arrivalTime ? `, arriving at ${tr.arrivalTime}` : '';
            bullets.push(`• Later, transfer to the railway station to board ${trainStr}${depStationStr}${depTimeStr}${arrStationStr}${arrTimeStr}. Upon arrival, meet our chauffeur and proceed to your hotel.`);
          } else {
            bullets.push(`• Later, transfer to the railway station to board your train to ${targetNext}. Upon arrival, meet our chauffeur and proceed to your hotel.`);
          }
        } else if (transit === 'bus') {
          const bs = city.busToNext;
          if (bs) {
            const busStr = bs.operator || bs.busNumber ? `${bs.operator ? bs.operator + ' ' : ''}${bs.busNumber ? `(${bs.busNumber})` : 'coach service'}` : 'your tourist bus';
            const depTimeStr = bs.departureTime ? ` departing at ${bs.departureTime}` : '';
            const depStationStr = bs.departureStation ? ` from ${bs.departureStation}` : ` from ${city.destination}`;
            const arrStationStr = bs.arrivalStation ? ` for ${bs.arrivalStation} (${targetNext})` : ` for ${targetNext}`;
            const arrTimeStr = bs.arrivalTime ? `, arriving at ${bs.arrivalTime}` : '';
            bullets.push(`• Later, transfer to the bus terminal to board ${busStr}${depStationStr}${depTimeStr}${arrStationStr}${arrTimeStr}. Upon arrival, proceed to your designated hotel.`);
          } else {
            bullets.push(`• Later, board your inter-city coach / tourist bus transfer to ${targetNext}.`);
          }
        } else if (transit === 'cruise') {
          const cr = city.cruiseToNext;
          if (cr) {
            const lineStr = cr.cruiseLine ? `${cr.cruiseLine} ` : '';
            const shipStr = cr.vesselName ? `aboard ${cr.vesselName}` : 'your luxury cruise';
            const depPort = cr.departurePort ? ` from ${cr.departurePort}` : ` from ${city.destination}`;
            const depTime = cr.departureTime ? ` departing at ${cr.departureTime}` : '';
            const arrPort = cr.arrivalPort ? ` sailing to ${cr.arrivalPort} (${targetNext})` : ` sailing to ${targetNext}`;
            const arrTime = cr.arrivalTime ? `, docking at ${cr.arrivalTime}` : '';
            bullets.push(`• Later, transfer to the cruise terminal to embark on ${lineStr}${shipStr}${depPort}${depTime}${arrPort}${arrTime}. Enjoy scenic sailing and onboard hospitality.`);
          } else {
            bullets.push(`• Later, transfer to the cruise terminal to embark on your scenic cruise voyage to ${targetNext}.`);
          }
        } else if (transit === 'ferry') {
          const fe = city.ferryToNext;
          if (fe) {
            const opStr = fe.operator ? `${fe.operator} ` : '';
            const vesStr = fe.vesselName ? `(${fe.vesselName}) ` : '';
            const depPort = fe.departurePort ? ` from ${fe.departurePort}` : ` from ${city.destination} Jetty`;
            const depTime = fe.departureTime ? ` departing at ${fe.departureTime}` : '';
            const arrPort = fe.arrivalPort ? ` for ${fe.arrivalPort} (${targetNext})` : ` for ${targetNext}`;
            const arrTime = fe.arrivalTime ? `, arriving at ${fe.arrivalTime}` : '';
            bullets.push(`• Later, transfer to the jetty / harbour to board ${opStr}${vesStr}high-speed ferry${depPort}${depTime}${arrPort}${arrTime}. Upon arrival, our chauffeur will receive you.`);
          } else {
            bullets.push(`• Later, transfer to the harbour to board your high-speed ferry transfer to ${targetNext}. Upon arrival, meet our representative.`);
          }
        } else if (transit === 'toy_train') {
          const tt = city.toyTrainToNext;
          if (tt) {
            const nameStr = tt.trainName ? `the historic ${tt.trainName}` : 'the heritage Toy Train';
            const numStr = tt.trainNumber ? ` (${tt.trainNumber})` : '';
            const depStn = tt.departureStation ? ` from ${tt.departureStation}` : ` from ${city.destination}`;
            const depTime = tt.departureTime ? ` departing at ${tt.departureTime}` : '';
            const arrStn = tt.arrivalStation ? ` for ${tt.arrivalStation} (${targetNext})` : ` for ${targetNext}`;
            const arrTime = tt.arrivalTime ? `, arriving at ${tt.arrivalTime}` : '';
            bullets.push(`• Later, board ${nameStr}${numStr}${depStn}${depTime}${arrStn}${arrTime}. Experience a picturesque UNESCO heritage mountain rail journey amidst breathtaking views.`);
          } else {
            bullets.push(`• Later, board the heritage mountain Toy Train to ${targetNext} enjoying spectacular Himalayan and valley panoramas.`);
          }
        } else if (transit === 'seaplane') {
          const sp = city.seaplaneToNext;
          if (sp) {
            const opStr = sp.operator ? `${sp.operator} ` : '';
            const flStr = sp.flightNumber ? `flight ${sp.flightNumber} ` : '';
            const depPt = sp.departurePoint ? ` from ${sp.departurePoint}` : ` from ${city.destination} Waterdrome`;
            const depTime = sp.departureTime ? ` departing at ${sp.departureTime}` : '';
            const arrPt = sp.arrivalPoint ? ` to ${sp.arrivalPoint} (${targetNext})` : ` to ${targetNext}`;
            const arrTime = sp.arrivalTime ? `, landing at ${sp.arrivalTime}` : '';
            bullets.push(`• Later, proceed to the waterdrome to board ${opStr}${flStr}scenic seaplane transfer${depPt}${depTime}${arrPt}${arrTime}. Experience thrilling water take-off, aerial panoramas, and smooth touchdown.`);
          } else {
            bullets.push(`• Later, board your thrilling scenic seaplane transfer to ${targetNext} enjoying sweeping aerial views.`);
          }
        } else if (city.driveToNext) {
          const viaStr = city.driveToNext.routeVia ? ` via ${city.driveToNext.routeVia}` : '';
          if (!city.checkOut || !city.skipSightseeing) {
            bullets.push(`• Later, embark on a comfortable highway drive to ${targetNext}${viaStr}.`);
          }
        }
      }

      if (isHotelIncluded && city.checkIn && !day.departureDetails?.enabled) {
        bullets.push(`• Upon arrival in ${city.destination}, transfer and check-in at your designated hotel.`);
      }
    });

    if (isHotelIncluded && day.arrivalDetails?.enabled && day.arrivalDetails.includeHotelCheckIn !== false && day.arrivalDetails.checkInTiming === 'after_sightseeing') {
      bullets.push(`• Following the day's tour and travel, transfer to your hotel for smooth check-in and relaxation.`);
    }

    if (day.departureDetails?.enabled) {
      const dep = day.departureDetails;
      const finalCity = day.cities[day.cities.length - 1]?.destination || day.destination;
      bullets.push(formatDepartureLogisticsNarrative(dep, finalCity, true));
    }

    if (!day.departureDetails?.enabled && isHotelIncluded) {
      const stayCity = day.cities[day.cities.length - 1]?.destination || day.overnightLocation || day.destination;
      bullets.push(`• Overnight stay in ${stayCity}.`);
    }

    return bullets.join('\n');
  }

  // Standard single destination day
  const bullets: string[] = [];

  if (day.arrivalDetails?.enabled) {
    const arr = day.arrivalDetails;
    bullets.push(formatArrivalLogisticsNarrative(arr, day.destination));
    
    if (isHotelIncluded && arr.includeHotelCheckIn !== false) {
      if (arr.checkInTiming !== 'after_sightseeing') {
        bullets.push(`• Transfer directly to your pre-booked hotel for check-in and leisure time to freshen up before commencing sightseeing.`);
      }
    }
  }

  const isDrivePast = (name: string) => /rashtrapati\s+bhavan.*parliament|parliament.*rashtrapati/i.test(name);
  const rawAttractions = day.attractionNames || [];
  const hasDrivePastRP = rawAttractions.some(isDrivePast);
  const walkingSights = rawAttractions.filter(n => !isDrivePast(n));

  if (walkingSights.length > 0) {
    const sightLines = walkingSights.map(s => `  - ${s}`).join('\n');
    bullets.push(`• Proceed for a comprehensive sightseeing tour of ${day.destination}, visiting prominent landmarks:\n${sightLines}`);
  } else if (!isLastDay && !hasDrivePastRP) {
    if (day.arrivalDetails?.enabled) {
      bullets.push(`• The remainder of the day is at leisure to unwind at the hotel or explore the local surroundings at your own pace.`);
    } else {
      bullets.push(`• Day at leisure to explore ${day.destination} at your own pace.`);
    }
  } else if (isLastDay && !hasDrivePastRP) {
    // Final day with no sightseeing activities: do not generate placeholder tour
    if (isHotelIncluded) {
      bullets.push(`• Complete hotel check-out and prepare for departure.`);
    } else {
      bullets.push(`• Prepare for your onward departure.`);
    }
  }

  if (hasDrivePastRP) {
    bullets.push(`• Drive past Rashtrapati Bhavan and Parliament.`);
  }

  if (isHotelIncluded && day.arrivalDetails?.enabled && day.arrivalDetails.includeHotelCheckIn !== false && day.arrivalDetails.checkInTiming === 'after_sightseeing') {
    bullets.push(`• Following the sightseeing tour, transfer to your hotel for smooth check-in and relaxation.`);
  }

  // Highway transfer to overnight location without mentioning Kms or hours
  if (!day.departureDetails?.enabled && !day.isOvernightSameLocation && day.overnightLocation && day.overnightLocation.toLowerCase() !== day.destination.toLowerCase()) {
    if (isHotelIncluded) {
      bullets.push(`• Later in the afternoon, commence your comfortable highway drive to ${day.overnightLocation}. Upon arrival, check-in to your hotel.`);
    } else {
      bullets.push(`• Later in the afternoon, commence your comfortable highway drive to ${day.overnightLocation}.`);
    }
  }

  // Departure logistics for single destination day (e.g. final day airport transfer)
  if (day.departureDetails?.enabled) {
    const dep = day.departureDetails;
    bullets.push(formatDepartureLogisticsNarrative(dep, day.destination, false));
  }

  if (!day.departureDetails?.enabled && isHotelIncluded) {
    const stayCity = day.overnightLocation || day.destination;
    bullets.push(`• Overnight stay in ${stayCity}.`);
  }

  return bullets.join('\n');
}

/**
 * Standardizes day description text by ensuring "Overnight stay in [City Name]."
 * is appended at the end of each day's description, except when Departure is active or hotel is excluded.
 */
export function ensureOvernightStayText(description: string, day: ItineraryDay): string {
  let desc = (description || '').trim();
  const stayCity = (day.isMultiCity && day.cities && day.cities.length > 0 ? day.cities[day.cities.length - 1]?.destination : day.overnightLocation) || day.destination || 'the destination';

  if (day.departureDetails?.enabled || day.excludeHotel) {
    // Departure is active or hotel is excluded for this day: completely remove any overnight stay line
    desc = desc.replace(/\n?\s*•?\s*Overnight\s+stay\s+at\s+your\s+designated\s+hotel\s+in\s+[^\n.]*\.?/gi, '');
    desc = desc.replace(/\n?\s*•?\s*Overnight\s+stay\s+in\s+[^\n.]*\.?/gi, '');
    desc = desc.replace(/\n?\s*•?\s*Overnight\s+in\s+[^\n.]*\.?/gi, '');
    return desc.trim();
  }

  // Departure is NOT active and hotel is NOT excluded: ensure "Overnight stay in [City Name]." is at the end
  desc = desc.replace(/\n?\s*•?\s*Overnight\s+stay\s+at\s+your\s+designated\s+hotel\s+in\s+[^\n.]*\.?/gi, '');
  desc = desc.replace(/\n?\s*•?\s*Overnight\s+stay\s+in\s+[^\n.]*\.?/gi, '');
  desc = desc.replace(/\n?\s*•?\s*Overnight\s+in\s+[^\n.]*\.?/gi, '');
  desc = desc.trim();

  const overnightLine = `• Overnight stay in ${stayCity}.`;
  return desc ? `${desc}\n${overnightLine}` : overnightLine;
}

/**
 * Dynamic Route Subtitle Generator
 * - Single City: [City Name]
 * - Multi-City (Drive only, no sightseeing in city 2): Drive from [City 1] to [City 2]
 * - Multi-City (Sightseeing in both): Sightseeing [City 1], drive to [City 2] and sightseeing
 * - 3+ Destinations: Structured sequence across destinations
 */
export function getRouteSubtitle(day: ItineraryDay): string {
  if (!day.isMultiCity || !day.cities || day.cities.length === 0) {
    return day.destination || '';
  }

  if (day.cities.length === 1) {
    return day.cities[0].destination || day.destination || '';
  }

  const cities = day.cities;
  const hasSight = (c: { skipSightseeing?: boolean; attractionNames?: string[]; attractionIds?: string[] }) =>
    !c.skipSightseeing &&
    Boolean((c.attractionNames && c.attractionNames.length > 0) || (c.attractionIds && c.attractionIds.length > 0));

  const transitVerb = (c: { transitType?: string }) => {
    if (c.transitType === 'flight') return 'flight to';
    if (c.transitType === 'train') return 'train to';
    if (c.transitType === 'bus') return 'bus to';
    if (c.transitType === 'cruise') return 'cruise to';
    if (c.transitType === 'ferry') return 'ferry to';
    if (c.transitType === 'toy_train') return 'toy train to';
    if (c.transitType === 'seaplane') return 'seaplane to';
    return 'drive to';
  };

  const transitFromVerb = (c: { transitType?: string }) => {
    if (c.transitType === 'flight') return 'Flight from';
    if (c.transitType === 'train') return 'Train from';
    if (c.transitType === 'bus') return 'Bus from';
    if (c.transitType === 'cruise') return 'Cruise from';
    if (c.transitType === 'ferry') return 'Ferry from';
    if (c.transitType === 'toy_train') return 'Toy Train from';
    if (c.transitType === 'seaplane') return 'Seaplane from';
    return 'Drive from';
  };

  const c0 = cities[0];
  const c0HasSight = hasSight(c0);

  let subtitle = '';
  if (c0HasSight) {
    subtitle = `Sightseeing ${c0.destination}`;
  } else {
    subtitle = `${transitFromVerb(c0)} ${c0.destination}`;
  }

  for (let i = 1; i < cities.length; i++) {
    const prev = cities[i - 1];
    const curr = cities[i];
    const currHasSight = hasSight(curr);

    if (i === 1 && !c0HasSight) {
      subtitle += ` to ${curr.destination}`;
    } else {
      subtitle += `, ${transitVerb(prev)} ${curr.destination}`;
    }

    if (currHasSight) {
      subtitle += ' and sightseeing';
    }
  }

  return subtitle;
}

/**
 * Dynamic Day Card Main Heading Generator
 * - Swaps routing/activity text into the main heading
 * - Replaces generic labels like 'Sightseeing', 'Day 2 Sightseeing', 'Delhi Sightseeing'
 * - Preserves specific custom titles (e.g. 'Amber Fort & Pink City Royal Palaces')
 * - Day 1: 'Arrival in [City Name]' (removes 'Welcome Orientation')
 * - Multi-City days: Dynamic routing text (e.g. 'Sightseeing Delhi, drive to Agra and sightseeing' or 'Drive from Delhi to Agra')
 */
export function getDayMainHeading(day: ItineraryDay): string {
  // If multi-city, always use the dynamic routing text
  if (day.isMultiCity && day.cities && day.cities.length > 1) {
    return getRouteSubtitle(day);
  }

  const routeSub = getRouteSubtitle(day) || day.destination || '';

  // Day 1 Arrival
  if (day.dayNumber === 1) {
    const dest = day.destination || 'Destination';
    if (!day.title) return `Arrival in ${dest}`;
    const cleanTitle = day.title.trim();
    if (
      /welcome\s+orientation/i.test(cleanTitle) ||
      /^arrival/i.test(cleanTitle) ||
      cleanTitle.toLowerCase() === 'sightseeing' ||
      cleanTitle.toLowerCase() === `${dest.toLowerCase()} sightseeing`
    ) {
      return `Arrival in ${dest}`;
    }
    const strippedDay1 = cleanTitle
      .replace(/[\s:–-]*welcome\s+orientation/gi, '')
      .replace(/[\s:–-]*sightseeing/gi, '')
      .trim();
    return strippedDay1 || `Arrival in ${dest}`;
  }

  // Other days:
  if (!day.title) {
    return routeSub;
  }

  const rawTitle = day.title.trim();

  // If title is purely generic: "Sightseeing", "Day 2 Sightseeing", "Delhi Sightseeing", "Day 2 - Sightseeing"
  const isGeneric =
    /^(day\s*\d+[\s:–-]*)?sightseeing$/i.test(rawTitle) ||
    rawTitle.toLowerCase() === 'sightseeing' ||
    rawTitle.toLowerCase() === `${(day.destination || '').toLowerCase()} sightseeing` ||
    rawTitle.toLowerCase() === `${(day.overnightLocation || '').toLowerCase()} sightseeing` ||
    /^(day\s*\d+)$/i.test(rawTitle);

  if (isGeneric) {
    return routeSub;
  }

  // If title ends with " - Sightseeing" or " Sightseeing", strip "Sightseeing"
  const stripped = rawTitle
    .replace(/[\s:–-]+sightseeing$/i, '')
    .replace(/^sightseeing[\s:–-]+/i, '')
    .replace(/\s+sightseeing$/i, '')
    .trim();

  if (!stripped || stripped.toLowerCase() === (day.destination || '').toLowerCase()) {
    return routeSub;
  }

  return stripped;
}

