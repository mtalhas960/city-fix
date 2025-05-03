import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 z-0" 
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        {/* Changed background gradient to match homepage hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/20 to-blue-500/20"></div>
        
        {/* Use the same pin and shape styling as homepage */}
        <div className="absolute w-4 h-4 bg-[#9333ea] rounded-full top-1/3 left-1/4 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-pink-500 rounded-full top-1/2 left-1/2 animate-ping"></div>
        <div className="absolute w-5 h-5 bg-teal-500 rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-[#9333ea] rounded-full top-[15%] left-[10%] animate-pulse"></div>
        <div className="absolute w-5 h-5 bg-[#9333ea]/80 rounded-full top-[75%] left-[25%] animate-ping"></div>
        <div className="absolute w-32 h-32 rounded-full border-2 border-[#9333ea]/10 top-1/4 right-1/4 animate-[spin_25s_linear_infinite]"></div>
        <div className="absolute w-40 h-40 rounded-full border border-white/10 bottom-1/4 left-1/3 animate-[spin_30s_linear_reverse_infinite]"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-0">
        {/* Modified gradient to better blend with the hero background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-transparent to-transparent z-10"></div>
        
        {/* Changed SVG fill colors to match the primary color scheme */}
        <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#9333ea" fillOpacity="0.1" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,176C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ec4899" fillOpacity="0.1" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,176C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        
        {/* Updated background gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#9333ea]/5"></div>
        
        {/* Updated building colors to match primary color scheme */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around opacity-20">
          <div className="w-16 md:w-24 h-40 md:h-64 bg-[#9333ea]/30 rounded-t-lg mx-1"></div>
          <div className="w-12 md:w-16 h-32 md:h-48 bg-[#9333ea]/40 rounded-t-lg mx-1"></div>
          <div className="w-20 md:w-32 h-48 md:h-80 bg-[#9333ea]/30 rounded-t-lg mx-1"></div>
          <div className="w-14 md:w-20 h-36 md:h-56 bg-pink-500/30 rounded-t-lg mx-1"></div>
          <div className="w-24 md:w-40 h-52 md:h-72 bg-[#9333ea]/30 rounded-t-lg mx-1"></div>
          <div className="w-18 md:w-28 h-44 md:h-60 bg-pink-500/30 rounded-t-lg mx-1"></div>
          <div className="w-16 md:w-24 h-40 md:h-68 bg-[#9333ea]/30 rounded-t-lg mx-1"></div>
        </div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-24">
        <div className="relative z-10 backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl shadow-xl border border-white/20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Empowering Citizens to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333ea] to-[#9233ea57]">Build Better Cities</span>
          </h1>
          
          <p className="text-md md:text-xl font-light text-black/80 mb-12 max-w-2xl mx-auto">
            CityFix bridges the gap between people and local authorities by making urban issue reporting simple and impactful.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/report" className="btn-primary">
              Start Reporting
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
