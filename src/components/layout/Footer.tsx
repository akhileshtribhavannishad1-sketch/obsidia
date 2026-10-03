import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#F2EEE7] pt-24 md:pt-32 pb-12 border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-20 border-b border-white/[0.06]">
          {/* Brand & Tagline */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center space-x-2 text-[14px] tracking-[0.28em] font-sans uppercase mb-4">
                <span className="text-[#8E1734]">✦</span>
                <span className="font-medium">OBSIDIA</span>
              </Link>
              <p className="font-editorial text-xl sm:text-2xl text-[#8A8780] font-light leading-relaxed max-w-xs mt-2 italic">
                Cast in shadow. <br />
                Worn like a vow.
              </p>
            </div>
            <div className="mt-8 text-[11px] tracking-[0.2em] text-[#52504D] uppercase font-mono">
              EST. LONDON / PARIS
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* EXPLORE */}
            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#8A8780] font-mono mb-5">
                EXPLORE
              </h4>
              <ul className="space-y-3.5 text-[12px] tracking-[0.12em] text-[#C4C4C2]">
                <li>
                  <Link to="/collection" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to="/craft" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Craft
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Lookbook
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            {/* CLIENT CARE */}
            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#8A8780] font-mono mb-5">
                CLIENT CARE
              </h4>
              <ul className="space-y-3.5 text-[12px] tracking-[0.12em] text-[#C4C4C2]">
                <li>
                  <Link to="/craft" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Sizing & Care
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Bespoke Castings
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <a href="#newsletter" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Private Viewings
                  </a>
                </li>
              </ul>
            </div>

            {/* CONNECT */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#8A8780] font-mono mb-5">
                CONNECT
              </h4>
              <ul className="space-y-3.5 text-[12px] tracking-[0.12em] text-[#C4C4C2]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <Link to="/journal" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link to="/craft" className="hover:text-[#F2EEE7] transition-colors inline-block py-0.5">
                    Stockists & Ateliers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* GIANT EDITORIAL WORDMARK */}
        <div className="py-12 md:py-16 text-center select-none overflow-hidden">
          <div className="font-editorial text-[17vw] leading-[0.8] tracking-[-0.02em] font-light text-[#F2EEE7]">
            OBSIDIA
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#52504D] gap-4">
          <div>
            © 2026 OBSIDIA — ALL RIGHTS RESERVED
          </div>
          <div className="text-center font-mono text-[#8A8780] hidden md:block">
            HANDMADE · ONE VOW AT A TIME
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-[#F2EEE7] transition-colors">
              TERMS
            </Link>
            <span className="text-white/10">·</span>
            <Link to="/privacy" className="hover:text-[#F2EEE7] transition-colors">
              PRIVACY
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
