import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'sliding-down' | 'exiting-down'>('idle');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // 1. Slide DOWN from above the viewport
      setTransitionStage('sliding-down');

      const switchTimer = setTimeout(() => {
        // 2. Change page content while curtain covers screen
        setDisplayLocation(location);
        window.scrollTo({ top: 0, behavior: 'instant' });

        // 3. Continue sliding DOWN to reveal the new page
        setTransitionStage('exiting-down');

        const finishTimer = setTimeout(() => {
          setTransitionStage('idle');
        }, 360);

        return () => clearTimeout(finishTimer);
      }, 320);

      return () => clearTimeout(switchTimer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Editorial Luxury Curtain: Slides from UP to DOWN on route change */}
      <div
        className={`fixed inset-0 z-[9990] pointer-events-none transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          transitionStage === 'idle'
            ? '-translate-y-full'
            : transitionStage === 'sliding-down'
            ? 'translate-y-0'
            : 'translate-y-full'
        } bg-gradient-to-b from-[#080808] via-[#0d0a0b] to-[#080808] border-b-2 border-[#8E1734] shadow-[0_15px_50px_rgba(142,23,52,0.4)] flex flex-col items-center justify-center`}
        aria-hidden="true"
      >
        <div className="text-center select-none flex flex-col items-center justify-center space-y-3">
          <span className="text-[#8E1734] text-2xl animate-pulse">✦</span>
          <span className="font-serif text-[#F2EEE7] text-2xl tracking-[0.35em] uppercase font-light">
            OBSIDIA
          </span>
          <span className="text-[10px] tracking-[0.28em] text-[#8A8780] uppercase">
            HANDMADE GOTHIC FINE JEWELRY
          </span>
        </div>
      </div>

      {/* Page Content: Clean container without persistent transform or overflow so GSAP ScrollTrigger pinning works perfectly */}
      <div className={`w-full transition-opacity duration-200 ${transitionStage === 'sliding-down' ? 'opacity-30' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

