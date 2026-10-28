'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home, Compass } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("[Lobo's Travel Wizard] Client runtime exception captured:", error);
  }, [error]);

  const handleResetCachesAndReload = () => {
    try {
      if (typeof window !== 'undefined') {
        // Clear local storage keys to clear any corrupted client cache
        localStorage.removeItem('lobo_itineraries_v3');
        localStorage.removeItem('lobo_hotels_v1');
        localStorage.removeItem('lobo_destinations_v7');
        localStorage.removeItem('lobo_attractions_v11');
        localStorage.removeItem('lobo_fleet_vehicles_v1');
        localStorage.removeItem('lobo_drivers_v1');
        localStorage.removeItem('lobo_operational_bookings_v1');
        window.location.href = '/';
      }
    } catch (_) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#151521] text-white flex flex-col items-center justify-center p-4 selection:bg-amber-400 selection:text-slate-950">
      <div className="w-full max-w-lg bg-[#1e1e2d] border border-[#26214F] rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26214F] text-amber-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" /> Lobo's Travel Wizard Platform Recovery
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Application Recovery
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            A temporary client-side initialization state or cache mismatch was detected. You can recover immediately using the options below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>

          <button
            onClick={handleResetCachesAndReload}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#26214F] hover:bg-[#26214F]/80 text-white font-semibold text-xs border border-white/10 transition active:scale-95"
          >
            <Trash2 className="w-4 h-4 text-amber-400" /> Reset Cache & Reload
          </button>
        </div>

        {/* Technical Error Details Toggle */}
        <div className="pt-4 border-t border-[#26214F]/60 text-left">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[11px] text-slate-400 hover:text-amber-300 transition flex items-center gap-1 mx-auto"
          >
            <span>{showDetails ? 'Hide' : 'View'} diagnostic details</span>
            <span>{showDetails ? '▲' : '▼'}</span>
          </button>

          {showDetails && (
            <div className="mt-3 p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-rose-300 overflow-x-auto max-h-40">
              <p className="font-semibold text-rose-400 mb-1">{error?.name || 'Error'}: {error?.message || 'Unknown error'}</p>
              {error?.digest && <p className="text-slate-500 text-[10px]">Digest: {error.digest}</p>}
              {error?.stack && (
                <pre className="text-[10px] text-slate-400 whitespace-pre-wrap mt-2">{error.stack}</pre>
              )}
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <Home className="w-3.5 h-3.5" /> Return to Dashboard Home
          </a>
        </div>

      </div>
    </div>
  );
}
