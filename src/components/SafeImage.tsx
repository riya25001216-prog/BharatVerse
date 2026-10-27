import { useState, type ImgHTMLAttributes } from 'react';
import { assetUrl } from '../lib/assets';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackCategory?: string;
}

export function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackText,
  fallbackCategory,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normalize src using assetUrl
  const resolvedSrc = src ? assetUrl(src) : '';

  if (!resolvedSrc || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ink-900 via-ink-950 to-saffron-950/40 p-6 text-center border border-white/10 ${className}`}
        role="img"
        aria-label={alt || fallbackText || 'Image placeholder'}
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F2A93B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-saffron-400/10 text-saffron-400 border border-saffron-400/20">
            <Sparkles size={18} />
          </div>
          {fallbackCategory && (
            <span className="text-[10px] uppercase tracking-widest text-saffron-400 font-medium">
              {fallbackCategory}
            </span>
          )}
          <span className="mt-1 font-display text-sm font-light text-parchment-100 line-clamp-2">
            {fallbackText || alt || 'BharatVerse Discovery'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
