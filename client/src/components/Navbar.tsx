import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

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
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="font-['Great_Vibes'] text-white text-xl">BWF</span>
          </div>
          <div>
            <h1 className="font-['Playfair_Display'] text-[#1E3D59] text-lg font-semibold leading-none">Bengaluru</h1>
            <p className="font-['Great_Vibes'] text-primary text-sm">Wedding Fraternity</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/" && "text-primary")}>Home</Link>
          <Link href="/about" className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/about" && "text-primary")}>About</Link>
          <Link href="/event" className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/event" && "text-primary")}>Event</Link>
          <Link href="/speakers" className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/speakers" && "text-primary")}>Speakers</Link>
          <Link href="/book" className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full transition-colors duration-300">Book Now</Link>
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
          <Link href="/" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/" && "text-primary")} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/about" && "text-primary")} onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/event" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/event" && "text-primary")} onClick={() => setIsMenuOpen(false)}>Event</Link>
          <Link href="/speakers" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/speakers" && "text-primary")} onClick={() => setIsMenuOpen(false)}>Speakers</Link>
          <Link href="/book" className="bg-primary text-white text-center py-2 rounded-full mt-2" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
        </div>
      </div>
    </header>
  );
}
