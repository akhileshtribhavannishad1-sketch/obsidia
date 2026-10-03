import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F2EEE7] flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <div className="text-[11px] font-mono tracking-[0.35em] text-[#8E1734] uppercase">
          ✦ 404 — VOID OF PRESENCE
        </div>
        <h1 className="font-editorial text-5xl sm:text-6xl font-light italic">
          Lost in Shadow
        </h1>
        <p className="text-[13px] text-[#8A8780] font-light leading-relaxed">
          The path you seek has not been forged, or has been dissolved into smoke. Return to the sanctuary of the series.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#F2EEE7] border-b border-[#8E1734] pb-1 hover:text-[#8E1734] transition-colors"
          >
            <span>RETURN TO THE SANCTUARY</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
