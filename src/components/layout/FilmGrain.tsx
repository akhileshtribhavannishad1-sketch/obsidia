import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.035] mix-blend-screen select-none overflow-hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full">
        <filter id="film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
      </svg>
    </div>
  );
};
