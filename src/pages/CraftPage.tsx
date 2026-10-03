import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Shield, Sparkles } from 'lucide-react';
import { CRAFT_SPECS } from '../data/products';

export const CraftPage: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Editorial Header */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.35em] uppercase text-[#8E1734] font-mono mb-4">
            <span>[ATELIER MANIFESTO]</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#F2EEE7] leading-[1.02] tracking-tight">
            The Alchemy of <br />
            <span className="italic font-serif-luxury font-normal text-[#C4C4C2]">Sacred Weight</span>
          </h1>
          <p className="mt-8 text-[13px] sm:text-[15px] leading-relaxed text-[#8A8780] font-light max-w-2xl">
            In an era of disposable digital luxury and hollow mass-casting, OBSIDIA exists as a monument to deliberate weight, subterranean metallurgy, and permanence.
          </p>
        </div>

        {/* Feature Hero Image */}
        <div className="relative w-full h-[400px] sm:h-[550px] md:h-[650px] bg-[#0A0A08] border border-white/[0.08] overflow-hidden mb-24">
          <img
            src="./assets/images/smoke-craft.jpg"
            alt="Hand-forging oxidized silver in atmospheric smoke"
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 max-w-md">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono block mb-2">
              FIGURE I — CENTRIFUGAL CASTING
            </span>
            <p className="font-editorial text-2xl sm:text-3xl text-[#F2EEE7] font-light italic">
              Molten 925 silver forced into vacuum-extracted investment flasks at 961.8°C.
            </p>
          </div>
        </div>

        {/* Pillars / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-t border-b border-white/[0.08] py-12 mb-28">
          {CRAFT_SPECS.map((spec, i) => (
            <div key={i} className="p-8 sm:p-12 space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#8E1734] font-mono">
                CRITERIA 0{i + 1}
              </span>
              <div className="font-editorial text-4xl sm:text-5xl text-[#F2EEE7] font-light">
                {spec.stat}
              </div>
              <div className="text-[11px] tracking-[0.2em] text-[#8A8780] uppercase">
                {spec.label}
              </div>
              <p className="text-[12px] text-[#C4C4C2] font-light leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Dive Sections */}
        <div className="space-y-28 max-w-5xl mx-auto">
          
          {/* Chapter 01 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-2">
                <Flame size={12} />
                <span>PHASE I</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
                Lost-Wax Ritual
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[13px] sm:text-[14px] leading-relaxed text-[#8A8780] font-light">
              <p>
                Every piece begins as hard jewelers’ carving wax, sculptured by hand under high-magnification binocular loupes. There are no computer-generated STL files, no resin 3D printers, and no mechanized toolpaths in our master studio.
              </p>
              <p>
                Once carved, the wax is enclosed in dental-grade refractory plaster and baked for eighteen hours in our electric kiln. As the wax incinerates without residue, a hollow chamber is left behind into which liquid metal is centrifugally injected.
              </p>
            </div>
          </div>

          {/* Chapter 02 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-2">
                <Shield size={12} />
                <span>PHASE II</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
                Blackened Patina
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[13px] sm:text-[14px] leading-relaxed text-[#8A8780] font-light">
              <p>
                Commercial silversmiths treat silver to remain mirror-bright. We do the opposite. Our metals undergo controlled sulfur vapor immersion and bone ash baths that accelerate centuries of subterranean oxidation in hours.
              </p>
              <p>
                The piece emerges pitch black. Our artisans then gently buff high-relief ridges using abrasive buckskin leather, allowing the silver grain to emerge while leaving abyssal shadows in each deep recess. The patina continues to evolve uniquely with the chemistry of your body.
              </p>
            </div>
          </div>

          {/* Chapter 03 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-2">
                <Sparkles size={12} />
                <span>PHASE III</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
                Garnet & Onyx
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[13px] sm:text-[14px] leading-relaxed text-[#8A8780] font-light">
              <p>
                We source exclusively natural Bohemian pyrope and almandine garnets from historic private vein reserves. Selected for their deep blood-crimson hues that appear almost black until struck by direct sunlight or candlelight.
              </p>
              <p>
                Every gemstone is hand-seated into solid talon prongs without glue or adhesive. The pressure of cold-forged silver secures the stone forever.
              </p>
            </div>
          </div>

        </div>

        {/* Bespoke Invitation CTA */}
        <div className="mt-32 p-10 sm:p-16 bg-[#080806] border border-white/[0.08] text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono">
            <span>✦ PRIVATE COMMISSIONS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#F2EEE7] font-light italic">
            Have a vow carved exclusively for you.
          </h2>
          <p className="text-[13px] text-[#8A8780] max-w-lg mx-auto font-light leading-relaxed">
            We accept four private ceremonial commissions per quarter. Engagement talismans, reliquaries, and mourning rings created with your requested gemstones and secret engravings.
          </p>
          <div className="pt-4">
            <Link
              to="/collection"
              className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#8E1734] hover:bg-[#700B23] text-white text-[11px] uppercase tracking-[0.25em] font-medium transition-colors"
            >
              <span>INQUIRE AT ATELIER</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
