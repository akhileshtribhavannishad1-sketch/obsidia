import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { X, Check, ArrowRight, Minus, Plus } from 'lucide-react';

interface ProductQuickModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductQuickModal: React.FC<ProductQuickModalProps> = ({ product, onClose }) => {
  const { addToBag } = useCart();
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToBag(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl bg-[#090908] border border-white/10 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} Details`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#8A8780] hover:text-[#F2EEE7] bg-black/50 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Left: Product Image */}
        <div className="relative bg-[#050505] aspect-square md:aspect-auto h-full min-h-[300px] flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-transparent to-transparent md:hidden" />
        </div>

        {/* Right: Product Narrative & Actions */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#8E1734]">
              <span>VOL. I — NO. {product.number}</span>
              <span className="text-[#8A8780] uppercase">{product.category}</span>
            </div>

            <div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
                {product.name}
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A8780] mt-1">
                {product.material}
              </p>
            </div>

            <div className="font-editorial text-2xl text-[#F2EEE7]">
              ${product.price}
            </div>

            <p className="text-[13px] leading-relaxed text-[#C4C4C2] font-light">
              {product.description}
            </p>

            {/* Ring Size Selector if applicable */}
            {product.sizes.length > 1 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-[#8A8780]">
                  <span>SELECT SIZE (US)</span>
                  <Link
                    to="/craft"
                    onClick={onClose}
                    className="text-[#8E1734] hover:underline"
                  >
                    SIZING GUIDE
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 text-[11px] font-mono border transition-all ${
                        selectedSize === size
                          ? 'border-[#8E1734] bg-[#8E1734]/20 text-[#F2EEE7]'
                          : 'border-white/10 text-[#8A8780] hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A8780]">QUANTITY</span>
            <div className="flex items-center border border-white/10">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="px-3 text-[11px] font-mono text-[#F2EEE7]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2 border-t border-white/[0.08]">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 text-[11px] tracking-[0.25em] uppercase font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                isAdded
                  ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200'
                  : 'bg-[#8E1734] hover:bg-[#700B23] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={14} />
                  <span>VOW ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <span>ADD TO BAG</span>
                  <span>✦</span>
                </>
              )}
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="w-full py-2.5 text-center text-[10px] tracking-[0.2em] uppercase text-[#8A8780] hover:text-[#F2EEE7] transition-colors flex items-center justify-center space-x-1"
            >
              <span>VIEW FULL EDITORIAL SPECIFICATION</span>
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
