import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductQuickModal } from '../product/ProductQuickModal';

gsap.registerPlugin(ScrollTrigger);

interface CollectionSectionProps {
  products: Product[];
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ products }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Only pin and horizontal scrub on desktop (viewport >= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate amount to scroll horizontally: track scrollWidth minus window innerWidth + padding
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 400, 1000)}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });

      // Animate heading in
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection-section"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-[#F2EEE7] py-20 lg:py-0 lg:h-screen flex flex-col justify-center overflow-hidden border-t border-white/[0.08]"
    >
      {/* Top Header / Metadata within Section */}
      <div
        ref={headingRef}
        className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-3">
            <span>[01 — COLLECTION]</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F2EEE7] font-light leading-[1.05] tracking-tight">
            The Vow <br />
            <span className="italic font-serif-luxury font-normal text-[#C4C4C2]">Series</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8A8780] uppercase font-mono">
          <span>THREE PIECES. KEEP SCROLLING</span>
          <span className="text-[#8E1734] animate-pulse">→</span>
        </div>
      </div>

      {/* Product Horizontal Track */}
      {/* Desktop uses GSAP pinned transform. Mobile uses native smooth touch scroll. */}
      <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-6 sm:px-10 md:px-16">
        <div
          ref={trackRef}
          className="flex space-x-6 sm:space-x-8 md:space-x-12 w-max pb-6 lg:pb-0"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}

          {/* End card / Invitation to bespoke */}
          <div className="flex flex-col justify-between w-[280px] sm:w-[340px] flex-shrink-0 bg-[#070707] border border-white/[0.06] p-8 select-none">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#8E1734]">
              ✦ ARCHIVE
            </div>
            <div className="my-auto space-y-4">
              <p className="font-editorial text-2xl sm:text-3xl text-[#F2EEE7] font-light italic leading-tight">
                Cast beyond the series.
              </p>
              <p className="text-[11px] tracking-[0.15em] text-[#8A8780] leading-relaxed uppercase">
                Private commissions & heirloom reconstructions undertaken in secrecy.
              </p>
            </div>
            <a
              href="#newsletter"
              className="text-[10px] uppercase tracking-[0.25em] text-[#F2EEE7] hover:text-[#8E1734] border-b border-white/20 pb-1 w-max transition-colors"
            >
              REQUEST AUDIENCE →
            </a>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
