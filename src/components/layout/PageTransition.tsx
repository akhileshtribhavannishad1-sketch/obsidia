import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsFading(false);
      }, 120);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`relative w-full transition-opacity duration-200 ease-out ${
        isFading ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};
