import React from 'react';
import { Hero } from '../components/home/Hero';
import { CollectionSection } from '../components/home/CollectionSection';
import { SmokeSection } from '../components/home/SmokeSection';
import { CraftSection } from '../components/home/CraftSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { PRODUCTS } from '../data/products';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#050505] text-[#F2EEE7] overflow-hidden">
      {/* Hero 100vh with Hand Motion */}
      <Hero />

      {/* [01 — COLLECTION] Horizontal Pinned Product Section */}
      <CollectionSection products={PRODUCTS.slice(0, 3)} />

      {/* Cinematic Smoke & Embers Alchemy Section */}
      <SmokeSection />

      {/* [02 — CRAFT] Made Without Compromise */}
      <CraftSection />

      {/* Private Correspondence Newsletter */}
      <NewsletterSection />
    </div>
  );
};
