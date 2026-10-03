import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Menu, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, openBag } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 h-[76px] md:h-[86px] px-6 sm:px-10 md:px-12 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        {/* LEFT: Logo */}
        <Link
          to="/"
          className="group flex items-center space-x-2 text-[#F2EEE7] tracking-[0.25em] text-[13px] md:text-[14px] font-sans font-light uppercase transition-opacity duration-300 hover:opacity-80"
          aria-label="OBSIDIA Home"
        >
          <span className="text-[#8E1734] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-45 text-[11px] inline-block">
            ✦
          </span>
          <span className="font-medium tracking-[0.28em]">OBSIDIA</span>
        </Link>

        {/* CENTER: Collection & Craft (Desktop) */}
        <nav className="hidden md:flex items-center space-x-12" aria-label="Main Navigation">
          <Link
            to="/collection"
            className={`text-[11px] uppercase tracking-[0.22em] transition-all duration-300 hover:text-[#F2EEE7] relative py-1 ${
              location.pathname === '/collection'
                ? 'text-[#F2EEE7] font-medium'
                : 'text-[#8A8780]'
            }`}
          >
            COLLECTION
            {location.pathname === '/collection' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-[#8E1734]" />
            )}
          </Link>
          <Link
            to="/craft"
            className={`text-[11px] uppercase tracking-[0.22em] transition-all duration-300 hover:text-[#F2EEE7] relative py-1 ${
              location.pathname === '/craft'
                ? 'text-[#F2EEE7] font-medium'
                : 'text-[#8A8780]'
            }`}
          >
            CRAFT
            {location.pathname === '/craft' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-[#8E1734]" />
            )}
          </Link>
          <Link
            to="/journal"
            className={`text-[11px] uppercase tracking-[0.22em] transition-all duration-300 hover:text-[#F2EEE7] relative py-1 ${
              location.pathname === '/journal'
                ? 'text-[#F2EEE7] font-medium'
                : 'text-[#8A8780]'
            }`}
          >
            JOURNAL
            {location.pathname === '/journal' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-[#8E1734]" />
            )}
          </Link>
        </nav>

        {/* RIGHT: BAG & Mobile Menu Button */}
        <div className="flex items-center space-x-6">
          <button
            onClick={openBag}
            className="text-[11px] uppercase tracking-[0.22em] text-[#F2EEE7] hover:text-[#8E1734] transition-colors duration-300 flex items-center space-x-1.5 focus:outline-none"
            aria-label={`Shopping Bag containing ${totalCount} items`}
          >
            <span className="text-[#8A8780] hover:text-[#F2EEE7] transition-colors">BAG</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] tracking-wider transition-colors ${
              totalCount > 0 ? 'bg-[#8E1734] text-white font-medium' : 'text-[#8A8780]'
            }`}>
              {totalCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F2EEE7] p-1.5 focus:outline-none hover:text-[#8E1734] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
