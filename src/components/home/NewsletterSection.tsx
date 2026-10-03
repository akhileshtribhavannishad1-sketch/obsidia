import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Strict validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      className="relative w-full bg-[#050505] text-[#F2EEE7] py-24 sm:py-32 border-b border-white/[0.08]"
      aria-label="Newsletter Subscription"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono">
              <span>[ CORRESPONDENCE ]</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F2EEE7] font-light leading-tight">
              Join the inner circle.
            </h2>

            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#8A8780] font-light max-w-lg">
              First access to new castings, private viewings, and the occasional secret. No automated sequences. Only handwritten dispatches from the forge.
            </p>
          </div>

          {/* Right Column: Minimal Underline Input Form */}
          <div className="lg:col-span-5">
            {isSubmitted ? (
              <div className="p-6 bg-[#0A0A08] border border-[#8E1734]/40 flex items-center space-x-4 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-[#8E1734]/20 border border-[#8E1734] flex items-center justify-center text-[#8E1734]">
                  <Check size={16} />
                </div>
                <div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-[#F2EEE7] font-medium">
                    YOUR VOW IS RECORDED.
                  </p>
                  <p className="text-[11px] text-[#8A8780] mt-0.5">
                    Look for private missives from OBSIDIA in your correspondence.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div className="relative">
                  <div className="flex items-center border-b border-white/20 focus-within:border-[#8E1734] transition-colors pb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Your email address"
                      aria-label="Your email address"
                      className="w-full bg-transparent text-[#F2EEE7] placeholder-[#52504D] text-[13px] sm:text-[14px] font-sans tracking-wide focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="ml-4 flex items-center space-x-1.5 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F2EEE7] hover:text-[#8E1734] transition-colors font-mono whitespace-nowrap focus:outline-none"
                      aria-label="Subscribe to inner circle"
                    >
                      <span>SUBSCRIBE</span>
                      <ArrowRight size={13} className="text-[#8E1734]" />
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-[10px] tracking-[0.15em] text-[#A31838] uppercase font-mono animate-fadeIn">
                    {error}
                  </p>
                )}

                <p className="text-[9px] tracking-[0.2em] uppercase text-[#52504D] font-mono">
                  BY SUBSCRIBING YOU ACCEPT OUR PRIVACY CHARTER · UNSUBSCRIBE ANY TIME
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
