import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRAFT_SPECS } from '../../data/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CraftSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const macroImageRef = useRef<HTMLImageElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on craft macro visual
      if (macroImageRef.current) {
        gsap.to(macroImageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Left column entrance
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
          }
        });
      }

      // 2x2 stats grid stagger
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft-section"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#F2EEE7] py-24 sm:py-32 overflow-hidden border-b border-white/[0.08]"
      aria-label="Artisanal Craftsmanship"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Upper Macro Cinematic Ring & Smoke Visual (matching Frame 00:08 & 00:14) */}
        <div className="relative w-full h-[320px] sm:h-[440px] md:h-[540px] bg-[#0A0A08] overflow-hidden mb-16 sm:mb-24 border border-white/[0.08]">
          <img
            ref={macroImageRef}
            src="./assets/images/smoke-craft.jpg"
            alt="Macro detail of hand-engraved oxidized gothic rings"
            className="w-full h-[120%] -top-[10%] relative object-cover object-[center_40%] brightness-[0.7] contrast-[1.15]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#8A8780] font-mono">
            <span className="text-[#8E1734]">✦</span>
            <span>LOST-WAX CASTING · ARCHIVAL PURITY</span>
          </div>
        </div>

        {/* 2-Column Layout matching Reference Video Frame 00:13 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Narrative, and View Collection Button */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-3">
                <span>[ 02 — CRAFT ]</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F2EEE7] font-light leading-[1.05] tracking-tight">
                Made Without <br />
                <span className="italic font-serif-luxury font-normal text-[#C4C4C2]">Compromise</span>
              </h2>
            </div>

            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#8A8780] font-light max-w-md">
              No factory floor. No assembly line. The material is chosen first; the form follows its nature. Weights are deliberate — each ring a physical presence you feel.
            </p>

            <div>
              <Link
                to="/collection"
                className="group inline-flex items-center space-x-3 px-6 py-3 rounded-full border border-white/20 bg-black/40 text-[11px] uppercase tracking-[0.22em] text-[#F2EEE7] hover:border-[#8E1734] hover:bg-black/60 transition-all duration-300"
              >
                <span>VIEW COLLECTION</span>
                <ArrowRight size={12} className="text-[#8E1734] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Statistics with Thin Line Dividers */}
          <div
            ref={gridRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t sm:border-t-0 sm:border-l border-white/[0.08]"
          >
            {CRAFT_SPECS.map((spec, index) => (
              <div
                key={index}
                className={`p-8 sm:p-10 flex flex-col justify-between space-y-6 border-b border-white/[0.08] ${
                  index % 2 === 0 ? 'sm:border-r border-white/[0.08]' : ''
                }`}
              >
                <div>
                  <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F2EEE7] font-light tracking-tight">
                    {spec.stat}
                  </div>
                  <div className="text-[11px] tracking-[0.22em] text-[#8E1734] font-mono uppercase mt-2">
                    {spec.label}
                  </div>
                </div>

                <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#8A8780] font-light">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
