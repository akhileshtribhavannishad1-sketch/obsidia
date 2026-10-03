import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';

export const BagDrawer: React.FC = () => {
  const {
    items,
    isBagOpen,
    closeBag,
    removeFromBag,
    updateQuantity,
    subtotal,
    totalCount
  } = useCart();

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeBag}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md bg-[#070707] text-[#F2EEE7] h-full flex flex-col justify-between border-l border-white/[0.08] shadow-2xl z-10 animate-slideLeft"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-[#8E1734] text-xs">✦</span>
            <h2 className="text-[12px] uppercase tracking-[0.22em] font-sans font-medium text-[#F2EEE7]">
              SHOPPING BAG ({totalCount})
            </h2>
          </div>
          <button
            onClick={closeBag}
            className="text-[#8A8780] hover:text-[#F2EEE7] transition-colors p-1"
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#8E1734]">
                ✦
              </div>
              <p className="font-editorial text-xl italic text-[#8A8780]">
                Your bag is empty.
              </p>
              <p className="text-[11px] tracking-[0.15em] text-[#52504D] max-w-xs uppercase">
                Cast your first vow from the series collection.
              </p>
              <Link
                to="/collection"
                onClick={closeBag}
                className="mt-4 inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] text-[#F2EEE7] border-b border-[#8E1734] pb-1 hover:text-[#8E1734] transition-colors"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex space-x-4 pb-6 border-b border-white/[0.06] group"
              >
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0A0A08] flex-shrink-0 overflow-hidden relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-editorial text-lg text-[#F2EEE7]">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromBag(item.product.id, item.size)}
                        className="text-[10px] text-[#52504D] hover:text-[#8E1734] tracking-wider uppercase transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                    <p className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase mt-0.5">
                      {item.product.material}
                    </p>
                    {item.size > 0 && (
                      <p className="text-[10px] tracking-[0.1em] text-[#52504D] uppercase mt-0.5">
                        SIZE: US {item.size}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-white/10 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-[11px] font-mono text-[#F2EEE7]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="font-editorial text-base text-[#F2EEE7]">
                      ${item.product.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-white/[0.08] bg-[#070707] space-y-4">
            <div className="flex justify-between items-center text-[11px] tracking-[0.2em] uppercase text-[#8A8780]">
              <span>SUBTOTAL</span>
              <span className="font-editorial text-xl text-[#F2EEE7] tracking-normal">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] tracking-[0.1em] text-[#52504D] uppercase">
              Taxes & insured courier delivery calculated at checkout.
            </p>

            <Link
              to="/bag"
              onClick={closeBag}
              className="w-full py-3.5 bg-[#8E1734] hover:bg-[#700B23] text-white text-[11px] tracking-[0.25em] uppercase font-sans font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
