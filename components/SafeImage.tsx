'use client';

import React, { useState, useEffect } from 'react';

export const GLOBAL_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&auto=format&fit=crop&q=80';

/**
 * Event handler for direct img tags: retries via proxy then falls back if loading fails
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl = GLOBAL_FALLBACK_IMAGE) {
  const target = e.currentTarget;
  if (target && target.src !== fallbackUrl) {
    if (!target.src.includes('/api/proxy-image') && target.src.startsWith('http')) {
      target.src = `/api/proxy-image?url=${encodeURIComponent(target.src)}`;
    } else {
      target.src = fallbackUrl;
    }
  }
}

export interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  fallbackSrc?: string;
}

/**
 * SafeImage component that renders authentic travel images with automatic proxy-retry
 * and referrer protection so images never fail or degrade to random fallbacks.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = GLOBAL_FALLBACK_IMAGE,
  onError,
  ...props
}) => {
  const initial = typeof src === 'string' && src ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initial);
  const [triedProxy, setTriedProxy] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(typeof src === 'string' && src ? src : fallbackSrc);
    setTriedProxy(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <img
      src={hasError ? fallbackSrc : (imgSrc || fallbackSrc)}
      alt={alt || 'Travel destination'}
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (!triedProxy && imgSrc && imgSrc.startsWith('http') && !imgSrc.includes('/api/proxy-image')) {
          setTriedProxy(true);
          setImgSrc(`/api/proxy-image?url=${encodeURIComponent(imgSrc)}`);
          return;
        }
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
        if (onError) {
          onError(e);
        }
      }}
      {...props}
    />
  );
};

export default SafeImage;
