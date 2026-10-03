import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'covering' | 'revealing'>('idle');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('covering');

      const coverTimer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('revealing');

        const revealTimer = setTimeout(() => {
          setTransitionStage('idle');
        }, 400);

        return () => clearTimeout(revealTimer);
      }, 350);

      return () => clearTimeout(coverTimer);
    }
  }, [location, displayLocation]);

  return (
    <div className="relative w-full">
      {/* Cinematic Dark Transition Curtain */}
      <div
        className={`fixed inset-0 z-[9990] bg-[#050505] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          transitionStage === 'covering'
            ? 'translate-y-0'
            : transitionStage === 'revealing'
            ? '-translate-y-full'
            : 'translate-y-full'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#8E1734] text-lg animate-pulse">✦</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`transition-opacity duration-300 ${
          transitionStage === 'covering' ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
