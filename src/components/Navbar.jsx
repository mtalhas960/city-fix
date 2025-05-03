import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${isScrolled ? 'bg-black/10 backdrop-blur-md' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="/logo-primary.svg" alt="CityFix Logo" className="h-12" />
              </Link>
            </div>

            {/* Desktop Navigation Links - with glassmorphism */}
            <div className="hidden lg:block">
              <div className={`backdrop-blur-md rounded-xl px-6 py-1 border border-primary/30 transition-all duration-300 ${isScrolled ? 'bg-white/55' : 'bg-primary/5'}`}>
                <div className="flex space-x-8">
                  <Link to="/" className="text-primary px-3 py-2 text-sm font-medium transition-colors">
                    Home
                  </Link>
                  <Link to="/about" className="text-primary/60 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                    About
                  </Link>
                  <Link to="/features" className="text-primary/60 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                    Features
                  </Link>
                  <Link to="/contact" className="text-primary/60 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                    Contact
                  </Link>
                  <Link to="/map" className="text-primary/60 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                    Live Map
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
                <Link to="/report" className="btn-primary">
                  Report Now
                </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#9333ea] focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`lg:hidden fixed top-[72px] left-0 right-0 z-40 ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="backdrop-blur-md bg-black/50 border-t border-white/5 px-4 pt-2 pb-3 space-y-1">
          <Link to="/" className="text-white hover:bg-[#9333ea]/20 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/about" className="text-white hover:bg-[#9333ea]/20 block px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          <Link to="/services" className="text-white hover:bg-[#9333ea]/20 block px-3 py-2 rounded-md text-base font-medium">
            Services
          </Link>
          <Link to="/contact" className="text-white hover:bg-[#9333ea]/20 block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </Link>
          <Link to="/report" className="bg-[#9333ea] text-white block px-3 py-2 rounded-md text-base font-medium mt-4">
            Report Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;