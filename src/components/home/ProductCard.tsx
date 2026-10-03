import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    setSpotlightPos({ x: pctX, y: pctY });

    // Subtle 3D tilt
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setTilt({
      rotateX: -normY * 4,
      rotateY: normX * 4,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="INSPECT"
      className="group relative flex flex-col justify-between w-[320px] sm:w-[380px] md:w-[440px] flex-shrink-0 bg-[#0A0A08] border border-white/[0.07] transition-all duration-300 hover:border-white/25 select-none p-6 sm:p-8"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Top: Product Number & Category */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#8A8780] pb-4 border-b border-white/[0.05]">
        <span className="text-[#8E1734] font-medium">{product.number}</span>
        <span className="uppercase text-[10px] text-[#52504D]">{product.category}</span>
      </div>

      {/* Center: Large Square Product Photograph with Specular Flashlight Highlight */}
      <div
        onClick={() => onQuickView && onQuickView(product)}
        className="relative my-6 aspect-square w-full bg-[#050505] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-[1.05]' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Dynamic Specular Spotlight / Flashlight that tracks cursor over the jewel */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 180px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(142, 23, 52, 0.28) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)`,
          }}
        />

        {/* Quick View Pill on Hover */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-400 transform ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.2em] uppercase text-[#F2EEE7] shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            INSPECT VOW ✦
          </span>
        </div>
      </div>

      {/* Bottom: Details & Price */}
      <div className="pt-4 space-y-2">
        <Link
          to={`/product/${product.id}`}
          className="block font-editorial text-2xl sm:text-3xl text-[#F2EEE7] group-hover:text-white transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono tracking-[0.16em]">
          <span className="uppercase text-[#8A8780]">{product.material}</span>
          <span className="text-[#F2EEE7] font-medium font-editorial text-lg sm:text-xl">${product.price}</span>
        </div>
      </div>
    </div>
  );
};
