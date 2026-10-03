import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, elegant simulated loading up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFade(true), 150);
          setTimeout(() => setLoading(false), 750);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25 + 15);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-700 ease-out select-none ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-2 text-[14px] md:text-[15px] tracking-[0.35em] text-[#F2EEE7] font-sans font-light uppercase">
          <span className="text-[#8E1734] animate-spin" style={{ animationDuration: '6s' }}>
            ✦
          </span>
          <span className="tracking-[0.4em] font-medium">OBSIDIA</span>
        </div>

        {/* Minimal thin progress line */}
        <div className="w-36 h-[1px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#8E1734] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <span className="text-[9px] font-mono tracking-[0.25em] text-[#52504D]">
          {Math.min(progress, 100)}%
        </span>
      </div>
    </div>
  );
};
