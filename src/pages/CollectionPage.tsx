import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/home/ProductCard';
import { ProductQuickModal } from '../components/product/ProductQuickModal';
import type { Product } from '../types';

export const CollectionPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Rings' | 'Talismans'>('All');
  const [metalFilter, setMetalFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (metalFilter !== 'All' && p.metal !== metalFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return parseInt(a.number) - parseInt(b.number);
    });
  }, [categoryFilter, metalFilter, sortBy]);

  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Page Header */}
        <div className="mb-16 md:mb-20 border-b border-white/[0.08] pb-12">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-4">
            <span>[ARCHIVE · VOL. I]</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#F2EEE7] leading-[1.02]">
              The Entire <br />
              <span className="italic font-serif-luxury font-normal text-[#C4C4C2]">Collection</span>
            </h1>

            <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#8A8780] font-light max-w-md">
              Each talisman is hand-cast in limited batches of thirty. Forged from dense sterling silver, architectural bronze, and untreated natural Bohemian garnets.
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-10 mt-8 border-t border-white/[0.05]">
            {/* Category tabs */}
            <div className="flex items-center space-x-3 sm:space-x-6 text-[11px] uppercase tracking-[0.2em]">
              {(['All', 'Rings', 'Talismans'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`pb-1 transition-all ${
                    categoryFilter === cat
                      ? 'text-[#F2EEE7] border-b border-[#8E1734] font-medium'
                      : 'text-[#8A8780] hover:text-[#F2EEE7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Metal filter & Sort dropdown */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
              {/* Metal selector */}
              <select
                value={metalFilter}
                onChange={(e) => setMetalFilter(e.target.value)}
                className="bg-[#0A0A08] border border-white/10 text-[#C4C4C2] px-3 py-1.5 focus:outline-none focus:border-[#8E1734] cursor-pointer"
                aria-label="Filter by metal"
              >
                <option value="All">ALL METALS</option>
                <option value="Oxidized Silver">OXIDIZED SILVER</option>
                <option value="Blackened Bronze">BLACKENED BRONZE</option>
                <option value="Graphite Silver">GRAPHITE SILVER</option>
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0A0A08] border border-white/10 text-[#C4C4C2] px-3 py-1.5 focus:outline-none focus:border-[#8E1734] cursor-pointer"
                aria-label="Sort collection"
              >
                <option value="default">EDITION NO.</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full flex justify-center">
              <ProductCard
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="font-editorial text-2xl text-[#8A8780] italic">
              No vows match your selected filter criteria.
            </p>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setMetalFilter('All');
              }}
              className="text-[11px] uppercase tracking-[0.2em] text-[#8E1734] border-b border-[#8E1734] pb-0.5"
            >
              RESET CRITERIA
            </button>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
