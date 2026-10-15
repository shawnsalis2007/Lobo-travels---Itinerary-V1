'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Building2, 
  Car, 
  Users, 
  Compass, 
  X, 
  ArrowRight,
  Eye,
  Layers,
  Zap
} from 'lucide-react';
import { 
  Itinerary, 
  Destination, 
  Attraction, 
  Hotel, 
  VehicleOption, 
  AppSettings 
} from '@/types';
import { 
  generateItineraryFromPrompt, 
  ParsedPromptParams 
} from '@/lib/natural-language-parser';

interface NaturalLanguageChatBarProps {
  destinations: Destination[];
  attractions: Attraction[];
  hotels: Hotel[];
  vehicles: VehicleOption[];
  settings?: AppSettings;
  onApplyItinerary: (itinerary: Itinerary, params: ParsedPromptParams) => void;
  onNavigateStep?: (step: number) => void;
  initialPrompt?: string;
  compact?: boolean;
}

const SAMPLE_PROMPTS = [
  '3-day Jaipur trip with 4-star hotel and Jhalana safari',
  '5-day Golden Triangle Delhi Agra Jaipur with 5-star hotel',
  '3-day Manali trip with Solang Valley and Atal Tunnel',
  '4-day Udaipur & Mount Abu with Lake Pichola boat cruise',
  '2-day Agra getaway with Taj Mahal sunrise'
];

export default function NaturalLanguageChatBar({
  destinations,
  attractions,
  hotels,
  vehicles,
  settings,
  onApplyItinerary,
  onNavigateStep,
  initialPrompt = '',
  compact = false
}: NaturalLanguageChatBarProps) {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastParsedParams, setLastParsedParams] = useState<ParsedPromptParams | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = (customPrompt !== undefined ? customPrompt : prompt).trim();
    if (!query) return;

    setIsProcessing(true);

    try {
      // Synchronous, zero-cost client-side generation
      const { itinerary, params } = generateItineraryFromPrompt(query, {
        destinations,
        attractions,
        hotels,
        vehicles,
        settings
      });

      onApplyItinerary(itinerary, params);
      setLastParsedParams(params);
      setShowFeedback(true);
    } catch (err) {
      console.error('Error parsing itinerary prompt', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSample = (sample: string) => {
    setPrompt(sample);
    handleSubmit(undefined, sample);
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Chat Bar Container */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#151521] via-[#1E1B4B] to-[#151521] border border-amber-500/30 shadow-lg text-white ${
        compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5'
      }`}>
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Header Title with Zero-Cost Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Natural Language Tour Assistant
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <Zap className="w-2.5 h-2.5 text-emerald-400" />
                    Zero-Cost · Instant
                  </span>
                </div>
                {!compact && (
                  <p className="text-[11px] text-slate-300">
                    Type in plain English to auto-populate destinations, duration, hotels, attractions & pricing.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 3-day Jaipur trip with 4-star hotel and Jhalana safari"
                className="w-full pl-3.5 pr-9 py-2.5 text-xs sm:text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 rounded-xl border border-white/20 focus:border-amber-400 focus:outline-none transition backdrop-blur-md font-medium"
              />
              {prompt && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing || !prompt.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-300 text-slate-950 font-extrabold text-xs tracking-wide shadow-md hover:shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isProcessing ? 'Generating...' : 'Generate Itinerary'}</span>
            </button>
          </form>

          {/* Quick Suggestions Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-amber-200/90 flex items-center gap-1">
              <span>Quick Prompts:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-[11px]">
              {SAMPLE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/20 text-slate-200 hover:text-amber-200 border border-white/10 hover:border-amber-400/30 transition text-left whitespace-nowrap active:scale-95 flex items-center gap-1"
                >
                  <span className="text-amber-400">⚡</span>
                  <span>{sample}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parsed Result Success Card */}
      {showFeedback && lastParsedParams && (
        <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">
                  Itinerary Draft Generated & Pre-filled Successfully!
                </h4>
                <p className="text-[11px] text-emerald-800 font-medium">
                  &ldquo;{lastParsedParams.tourName}&rdquo;
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowFeedback(false)}
              className="text-emerald-700 hover:text-emerald-950 p-1"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Extracted Parameter Badges */}
          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-slate-800 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{lastParsedParams.destinations.join(' → ')}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-slate-800 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>{lastParsedParams.daysCount} Days / {lastParsedParams.nights} Nights</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-slate-800 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>
                {lastParsedParams.includeHotels
                  ? `${lastParsedParams.hotelStarTier.replace('_', '-')} Hotels`
                  : 'Cab Only (No Hotel)'}
              </span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-slate-800 shadow-2xs">
              <Car className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lastParsedParams.vehicleBrand} {lastParsedParams.vehicleModel}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-slate-800 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lastParsedParams.adults} Adults{lastParsedParams.children > 0 ? ` + ${lastParsedParams.children} Kids` : ''}</span>
            </span>

            {lastParsedParams.selectedAttractions.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 font-semibold text-amber-900 shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  Included Sights: {lastParsedParams.selectedAttractions.map(a => a.name).join(', ')}
                </span>
              </span>
            )}
          </div>

          {/* Quick Jump Action Buttons */}
          {onNavigateStep && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-200">
              <button
                type="button"
                onClick={() => onNavigateStep(3)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Jump to Step 3 (Visual Day-by-Day Tour)</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateStep(5)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300 transition"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                <span>View Cover Image & Pricing (Step 5)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
