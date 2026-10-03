import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
            LEGAL ARCHIVE
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light">
            Privacy Charter
          </h1>
        </div>

        <div className="space-y-8 text-[13px] leading-relaxed text-[#8A8780] font-light">
          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              1. The Principle of Secrecy
            </h2>
            <p>
              OBSIDIA respects client anonymity as a fundamental principle of fine craftsmanship. We do not sell, rent, monetize, or disclose your client record or acquisition history to third-party ad networks or brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              2. Data Collected
            </h2>
            <p>
              We only retain physical shipping coordinates and correspondence email necessary to fulfill your insured courier consignment and service your lifetime restoration warranty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[#F2EEE7] text-base font-sans tracking-wider uppercase font-medium">
              3. Private Correspondence
            </h2>
            <p>
              When subscribing to our Inner Circle, you receive solely hand-drafted communiqués from our forge. You may dissolve this pact at any moment via the unsubscribe dispatch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
