import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#8A8780] hover:text-[#F2EEE7] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          <span>RETURN TO SANCTUARY</span>
        </Link>

        <div className="border-b border-white/[0.08] pb-10 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono block mb-3">
            TERMS OF ACQUISITION
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light">
            Covenant of Custody
          </h1>
        </div>

        <div className="space-y-8 text-[13px] leading-relaxed text-[#8A8780] font-light">
          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              1. Casting Edition Integrity
            </h2>
            <p>
              Each numbered piece from the Vow Series is produced in an edition limited strictly to 30 specimens worldwide. Once an edition reaches its allotment, the mold is ceremonially shattered.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              2. Lifetime Patina Guarantee
            </h2>
            <p>
              Your jewel will react dynamically to your skin chemistry and touch. Should you ever wish to renew, re-oxidize, or re-temper the charcoal surface, return the talisman to our forge for complimentary restoration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              3. Courier & Custody Transfer
            </h2>
            <p>
              Consignments are conveyed in tamper-evident sealed wooden reliquaries via armed/insured courier. Risk of custody transfers upon signed physical receipt.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
