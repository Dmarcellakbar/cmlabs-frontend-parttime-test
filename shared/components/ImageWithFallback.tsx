'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  width = 80,
  height = 80,
  className,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* SKELETON */}
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}

      {/* FALLBACK */}
      {error && (
        <div className="flex items-center justify-center w-full h-full text-2xl">
          🍳
        </div>
      )}

      {!error && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          className={`object-contain transition-opacity ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}