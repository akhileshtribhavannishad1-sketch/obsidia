import React, { useEffect, useState } from 'react';

export const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[1px] bg-white/10 z-50 pointer-events-none">
      <div
        className="h-full bg-[#8E1734] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(142,23,52,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
