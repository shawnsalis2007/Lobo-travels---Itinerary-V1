import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to "date - month - year" format (DD-MM-YYYY)
 * Example: "2026-10-20" -> "20-10-2026"
 */
export function formatDateDMY(dateStr?: string): string {
  if (!dateStr) return '';
  const trimmed = dateStr.trim();
  const ymdMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (ymdMatch) {
    const [, yyyy, mm, dd] = ymdMatch;
    return `${dd.padStart(2, '0')}-${mm.padStart(2, '0')}-${yyyy}`;
  }
  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  return trimmed;
}

/**
 * Calculates a day's Date object based on the trip start date and day number (1-indexed).
 * Correctly offsets days without timezone drift.
 */
export function getDayDate(startDate?: string, dayNumber: number = 1): Date | null {
  if (!startDate || !startDate.trim()) return null;
  const trimmed = startDate.trim();
  const match = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const d = new Date(year, month, day + (dayNumber - 1));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(trimmed);
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + (dayNumber - 1));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Formats a day's date for display in day cards and itinerary headers.
 * Example outputs:
 * - default: "Mon, 12 Oct 2026"
 * - short: "Mon, Oct 12"
 * - day-month-year: "12 Oct 2026"
 */
export function formatDayDate(
  startDate?: string,
  dayNumber: number = 1,
  options?: { includeDayOfWeek?: boolean; includeYear?: boolean; format?: 'short' | 'full' | 'day-month-year' }
): string {
  const d = getDayDate(startDate, dayNumber);
  if (!d) return '';

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = daysOfWeek[d.getDay()];
  const dayOfMonth = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  if (options?.format === 'short') {
    return `${dayOfWeek}, ${monthName} ${dayOfMonth}`;
  }

  if (options?.format === 'day-month-year') {
    return `${dayOfMonth} ${monthName} ${year}`;
  }

  const dow = options?.includeDayOfWeek !== false ? `${dayOfWeek}, ` : '';
  const yr = options?.includeYear !== false ? ` ${year}` : '';
  return `${dow}${dayOfMonth} ${monthName}${yr}`;
}

/**
 * Returns ISO date string (YYYY-MM-DD) for a day number
 */
export function getDayDateISO(startDate?: string, dayNumber: number = 1): string {
  const d = getDayDate(startDate, dayNumber);
  if (!d) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
