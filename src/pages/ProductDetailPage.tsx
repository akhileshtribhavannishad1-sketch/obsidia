import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/home/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToBag } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product ? product.image : '');
  const [selectedSize, setSelectedSize] = useState<number>(product?.sizes[0] || 0);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return <Navigate to="/collection" replace />;
  }

  const handleAdd = () => {
    addToBag(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Back Link */}
        <Link
          to="/collection"
          className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#8A8780] hover:text-[#F2EEE7] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          <span>RETURN TO COLLECTION</span>
        </Link>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/[0.08]">
          
          {/* Left Column: Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full bg-[#080806] border border-white/[0.08] overflow-hidden">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.25em] text-[#8E1734] bg-black/60 backdrop-blur-md px-3 py-1">
                VOL. I — NO. {product.number}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`aspect-square bg-[#080806] border transition-all overflow-hidden ${
                    (activeImage || product.image) === imgSrc
                      ? 'border-[#8E1734] opacity-100'
                      : 'border-white/[0.08] opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} detail view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative & Ordering (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-2">
                HANDMADE PIECE · VOL. I
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#F2EEE7] font-light leading-tight">
                {product.name}
              </h1>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8A8780] mt-1 font-mono">
                {product.material}
              </p>
              <div className="font-editorial text-3xl text-[#F2EEE7] mt-4 font-light">
                ${product.price}
              </div>
            </div>

            <div className="border-t border-b border-white/[0.08] py-6 space-y-4">
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#C4C4C2] font-light">
                {product.description}
              </p>
              <p className="text-[12px] leading-relaxed text-[#8A8780] font-light italic">
                {product.story}
              </p>
            </div>

            {/* Ring Size Selection */}
            {product.sizes.length > 1 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#8A8780]">
                  <span>SELECT FINGER SIZE (US)</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#8E1734] hover:underline"
                  >
                    {showSizeGuide ? 'CLOSE GUIDE' : 'SIZING GUIDE'}
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 text-[12px] font-mono border transition-all ${
                        selectedSize === size
                          ? 'border-[#8E1734] bg-[#8E1734]/20 text-[#F2EEE7] font-medium'
                          : 'border-white/10 text-[#8A8780] hover:border-white/30 hover:text-[#F2EEE7]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {showSizeGuide && (
                  <div className="p-4 bg-[#0A0A08] border border-white/10 text-[11px] text-[#8A8780] space-y-2 animate-fadeIn font-mono">
                    <p className="text-[#F2EEE7] font-sans">PRECISION FINGER MEASUREMENT:</p>
                    <p>US 7 = 54.4mm circumference · US 8 = 57.0mm · US 9 = 59.5mm · US 10 = 62.1mm</p>
                    <p>Each ring has a comfort-fit beveled interior. If between sizes, select the larger half.</p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Bag CTA */}
            <div className="space-y-4">
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isAdded
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                    : 'bg-[#8E1734] hover:bg-[#700B23] text-white shadow-[0_0_24px_rgba(142,23,52,0.3)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={15} />
                    <span>VOW ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <span>ACQUIRE VOW — ${product.price}</span>
                    <span>✦</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[9px] uppercase tracking-[0.18em] text-[#8A8780] font-mono">
                <div className="p-3 bg-[#080806] border border-white/[0.05] flex flex-col items-center space-y-1">
                  <ShieldCheck size={14} className="text-[#8E1734]" />
                  <span>LIFETIME PATINA</span>
                </div>
                <div className="p-3 bg-[#080806] border border-white/[0.05] flex flex-col items-center space-y-1">
                  <Truck size={14} className="text-[#8E1734]" />
                  <span>INSURED COURIER</span>
                </div>
                <div className="p-3 bg-[#080806] border border-white/[0.05] flex flex-col items-center space-y-1">
                  <RefreshCw size={14} className="text-[#8E1734]" />
                  <span>BESPOKE RESIZE</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#8A8780] font-mono">
                SPECIFICATIONS
              </h3>
              <ul className="space-y-2 text-[12px] text-[#C4C4C2] font-light">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#8E1734] mt-1 text-[9px]">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Related Pieces */}
        <div className="pt-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono block mb-2">
                ACCOMPANYING PIECES
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
                Other Vows in the Series
              </h2>
            </div>
            <Link
              to="/collection"
              className="text-[10px] uppercase tracking-[0.25em] text-[#8A8780] hover:text-[#F2EEE7] transition-colors border-b border-white/20 pb-0.5"
            >
              VIEW ALL ARCHIVES →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
