import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const BagPage: React.FC = () => {
  const { items, removeFromBag, updateQuantity, clearBag, subtotal, totalCount } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: 'United Kingdom',
  });

  const shippingCost = subtotal > 500 ? 0 : 45;
  const estimatedTax = Math.round(subtotal * 0.08);
  const finalTotal = subtotal + shippingCost + estimatedTax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please enter your full delivery coordinates.');
      return;
    }
    setIsOrdered(true);
    clearBag();
  };

  if (isOrdered) {
    return (
      <div className="pt-32 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-[#080806] border border-[#8E1734]/40 p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#8E1734]/20 border border-[#8E1734] mx-auto flex items-center justify-center text-[#8E1734]">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono">
              CONSIGNMENT DISPATCH SEALED
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light">
              Your Vow is Cast.
            </h1>
            <p className="text-[13px] text-[#8A8780] font-light leading-relaxed">
              Order confirmation #OBS-{Math.floor(100000 + Math.random() * 900000)} has been dispatched to {formData.email}. Your piece is being prepared with wax-sealed certification.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <Link
              to="/collection"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#F2EEE7] hover:text-[#8E1734] transition-colors border-b border-[#8E1734] pb-1"
            >
              <span>RETURN TO COLLECTION</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/[0.08] flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-2">
              <span>[RESERVED PIECES]</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#F2EEE7] font-light">
              Your Bag ({totalCount})
            </h1>
          </div>
          <Link
            to="/collection"
            className="text-[11px] uppercase tracking-[0.2em] text-[#8A8780] hover:text-[#F2EEE7] transition-colors hidden sm:block"
          >
            CONTINUE BROWSING →
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <p className="font-editorial text-3xl italic text-[#8A8780]">
              You have no active pieces reserved.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#8E1734] hover:bg-[#700B23] text-white text-[11px] uppercase tracking-[0.25em] transition-colors"
            >
              <span>EXPLORE THE VOW SERIES</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Cart Items List (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-[#080806] border border-white/[0.06] group"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#050505] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono tracking-[0.25em] text-[#8E1734] uppercase">
                            NO. {item.product.number}
                          </span>
                          <h3 className="font-editorial text-2xl text-[#F2EEE7]">
                            {item.product.name}
                          </h3>
                        </div>
                        <div className="font-editorial text-xl text-[#F2EEE7]">
                          ${item.product.price * item.quantity}
                        </div>
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-[#8A8780] mt-1">
                        {item.product.material}
                      </p>
                      {item.size > 0 && (
                        <p className="text-[11px] tracking-[0.1em] text-[#52504D] uppercase mt-0.5 font-mono">
                          SIZE: US {item.size}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-[12px] font-mono text-[#F2EEE7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-1.5 text-[#8A8780] hover:text-[#F2EEE7] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBag(item.product.id, item.size)}
                        className="text-[10px] uppercase tracking-[0.2em] text-[#52504D] hover:text-[#8E1734] transition-colors"
                      >
                        REMOVE FROM BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#080806] border border-white/[0.05] flex items-center space-x-3 text-[11px] text-[#8A8780]">
                <ShieldCheck size={18} className="text-[#8E1734] flex-shrink-0" />
                <span>Every casting includes hand-signed wax seal certificate and lifetime restoration.</span>
              </div>
            </div>

            {/* Right: Checkout & Address Form (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-[#080806] border border-white/[0.08] p-6 sm:p-8 space-y-6">
              <h2 className="text-[11px] uppercase tracking-[0.25em] text-[#8E1734] font-mono">
                DISPATCH COORDINATES
              </h2>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Citizen..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 px-3 py-2 text-[13px] text-[#F2EEE7] focus:outline-none focus:border-[#8E1734]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase block mb-1">
                    Email for Dispatch Tracking
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="correspondence@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 px-3 py-2 text-[13px] text-[#F2EEE7] focus:outline-none focus:border-[#8E1734]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase block mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street, Estate, Suite"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 px-3 py-2 text-[13px] text-[#F2EEE7] focus:outline-none focus:border-[#8E1734]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3 py-2 text-[13px] text-[#F2EEE7] focus:outline-none focus:border-[#8E1734]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#8A8780] uppercase block mb-1">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3 py-2 text-[12px] text-[#F2EEE7] focus:outline-none focus:border-[#8E1734]"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="pt-6 border-t border-white/[0.08] space-y-2 text-[11px] tracking-[0.15em] uppercase text-[#8A8780]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-editorial text-base text-[#F2EEE7]">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Global Courier</span>
                    <span className="text-[#F2EEE7] font-mono">
                      {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-[#F2EEE7] font-mono">${estimatedTax}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/[0.08] text-[13px] text-[#F2EEE7]">
                    <span className="font-medium">Total</span>
                    <span className="font-editorial text-2xl text-[#F2EEE7]">${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#8E1734] hover:bg-[#700B23] text-white text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>SEAL & ORDER VOW</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
