import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-shadow duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-white/90"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#hero" className="flex items-center space-x-2 z-10">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="font-['Great_Vibes'] text-white text-xl">BWF</span>
          </div>
          <div>
            <h1 className="font-['Playfair_Display'] text-[#1E3D59] text-lg font-semibold leading-none">Bengaluru</h1>
            <p className="font-['Great_Vibes'] text-primary text-sm">Wedding Fraternity</p>
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">About</a>
          <a href="#event" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">Event</a>
          <a href="#speakers" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">Speakers</a>
          <a href="#faq" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">FAQ</a>
          <a href="#book" className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full transition-colors duration-300">Book Now</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-[#1E3D59] focus:outline-none z-10"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-white w-full animate-fadeIn transition-all duration-300",
        isMenuOpen ? "opacity-100 max-h-80" : "opacity-0 max-h-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
          <a href="#about" className="text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#event" className="text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Event</a>
          <a href="#speakers" className="text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Speakers</a>
          <a href="#faq" className="text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>FAQ</a>
          <a href="#book" className="bg-primary text-white text-center py-2 rounded-full mt-2" onClick={() => setIsMenuOpen(false)}>Book Now</a>
        </div>
      </div>
    </header>
  );
}
