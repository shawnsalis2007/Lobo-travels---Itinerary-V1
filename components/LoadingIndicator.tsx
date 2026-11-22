'use client';

import React from 'react';

export interface LoadingIndicatorProps {
  /**
   * If true, renders a fixed, centered full-screen backdrop overlay (`fixed inset-0 z-[9999]`).
   * If false, renders a centered section loader filling its container (`flex flex-col items-center justify-center`).
   * Default: false
   */
  fullScreen?: boolean;
  /**
   * Main loading title/heading text (e.g. "Loading...", "Generating PDF...", "Saving to Database...")
   */
  message?: string;
  /**
   * Optional subtext or explanation (e.g. "Formatting A4 pages. Please wait...")
   */
  subtext?: string;
  /**
   * Size of spinner: 'sm' | 'md' | 'lg'. Default: 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Visual theme: 'dark' (default for Lobo operations) | 'light' | 'transparent'
   */
  variant?: 'dark' | 'light' | 'transparent';
  /**
   * Optional custom className for container
   */
  className?: string;
}

export default function LoadingIndicator({
  fullScreen = false,
  message = 'Loading...',
  subtext,
  size = 'md',
  variant = 'dark',
  className = ''
}: LoadingIndicatorProps) {
  // Sizing definitions
  const spinnerSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24'
  }[size];

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5'
  }[size];

  const textSizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-lg sm:text-xl font-bold'
  }[size];

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`flex flex-col items-center justify-center text-center p-4 select-none ${
        variant === 'dark' ? 'text-white' : 'text-slate-900'
      } ${className}`}
    >
      {/* Centered Glowing Spinner */}
      <div className="relative flex items-center justify-center mb-3">
        {/* Subtle radial glow aura */}
        <div className="absolute -inset-2 rounded-full bg-amber-500/15 blur-md pointer-events-none" />

        {/* Outer track */}
        <div
          className={`${spinnerSizeClasses} rounded-full border-[3px] sm:border-4 border-amber-500/20`}
        />

        {/* Spinning active arc */}
        <div
          className={`absolute inset-0 ${spinnerSizeClasses} rounded-full border-[3px] sm:border-4 border-amber-500 border-t-transparent border-r-amber-400 animate-spin`}
        />

        {/* Central glowing pulse dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center animate-pulse">
            <div className={`${dotSizeClasses} rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]`} />
          </div>
        </div>
      </div>

      {/* Primary Message */}
      {message && (
        <p className={`${textSizeClasses} tracking-tight mt-1`}>
          {message}
        </p>
      )}

      {/* Subtext */}
      {subtext && (
        <p
          className={`text-xs sm:text-sm mt-1.5 max-w-xs sm:max-w-sm leading-relaxed ${
            variant === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {subtext}
        </p>
      )}

      {/* Animated Activity Progress Bar */}
      <div className="w-20 sm:w-28 h-1 bg-amber-500/20 rounded-full overflow-hidden mt-3.5">
        <div className="h-full w-full bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 animate-pulse" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
        <div className="bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full mx-auto flex flex-col items-center justify-center ring-1 ring-amber-500/20">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[220px] sm:min-h-[280px] flex items-center justify-center">
      {content}
    </div>
  );
}

export function LoadingOverlay(props: Omit<LoadingIndicatorProps, 'fullScreen'>) {
  return <LoadingIndicator fullScreen {...props} />;
}
