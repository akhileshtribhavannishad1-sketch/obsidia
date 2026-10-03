import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-8 sm:p-12 md:hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Top bar with close button */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center space-x-2 text-[#F2EEE7] tracking-[0.28em] text-[13px] font-sans font-light uppercase"
        >
          <span className="text-[#8E1734] text-[12px]">✦</span>
          <span>OBSIDIA</span>
        </Link>
        <button
          onClick={onClose}
          className="text-[#8A8780] hover:text-[#F2EEE7] p-2 transition-colors focus:outline-none"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex flex-col space-y-6 my-auto">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#8E1734] mb-2 font-mono">
          [MENU]
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="font-editorial text-3xl text-[#F2EEE7] hover:text-[#8E1734] transition-colors duration-300 font-light"
        >
          Home
        </Link>

        <Link
          to="/collection"
          onClick={onClose}
          className="font-editorial text-3xl text-[#F2EEE7] hover:text-[#8E1734] transition-colors duration-300 font-light"
        >
          Collection
        </Link>

        <Link
          to="/craft"
          onClick={onClose}
          className="font-editorial text-3xl text-[#F2EEE7] hover:text-[#8E1734] transition-colors duration-300 font-light"
        >
          Craft
        </Link>

        <Link
          to="/journal"
          onClick={onClose}
          className="font-editorial text-3xl text-[#F2EEE7] hover:text-[#8E1734] transition-colors duration-300 font-light"
        >
          Journal & Lookbook
        </Link>

        <Link
          to="/bag"
          onClick={onClose}
          className="font-editorial text-3xl text-[#8A8780] hover:text-[#F2EEE7] transition-colors duration-300 font-light"
        >
          Shopping Bag
        </Link>
      </nav>

      {/* Footer Info */}
      <div className="pt-6 border-t border-white/[0.08] flex flex-col space-y-3">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A8780]">
          Cast in shadow. Worn like a vow.
        </p>
        <div className="flex space-x-6 text-[10px] tracking-[0.2em] uppercase text-[#52504D]">
          <Link to="/privacy" onClick={onClose} className="hover:text-[#F2EEE7]">Privacy</Link>
          <Link to="/terms" onClick={onClose} className="hover:text-[#F2EEE7]">Terms</Link>
          <span>London · Paris · Tokyo</span>
        </div>
      </div>
    </div>
  );
};
