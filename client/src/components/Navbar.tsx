import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    // Only run this effect in browser environment
    if (typeof window === 'undefined') return;

    try {
      const handleScroll = () => {
        try {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        } catch (error) {
          console.error("Error in scroll handler:", error);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error("Error setting up scroll listener:", error);
    }
  }, []);

  // Scroll to top whenever location changes
  useEffect(() => {
    // Make sure window exists (prevents SSR issues)
    if (typeof window !== 'undefined') {
      scrollToTop();
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Function to scroll to top immediately (no smooth scrolling)
  const scrollToTop = () => {
    try {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error scrolling to top:", error);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-shadow duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-white/90"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" onClick={scrollToTop} className="flex items-center space-x-2 z-10">
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
          <Link href="/" onClick={scrollToTop} className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/" && "text-primary")}>Home</Link>
          <Link href="/about" onClick={scrollToTop} className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/about" && "text-primary")}>About</Link>
          <Link href="/event" onClick={scrollToTop} className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/event" && "text-primary")}>Event</Link>
          <Link href="/speakers" onClick={scrollToTop} className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/speakers" && "text-primary")}>Speakers</Link>
          <Link href="/feedback" onClick={scrollToTop} className={cn("text-[#1E3D59] hover:text-primary transition-colors duration-300", location === "/feedback" && "text-primary")}>Feedback</Link>
          <Link href="/book" onClick={scrollToTop} className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full transition-colors duration-300">Book Now</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-[#1E3D59] focus:outline-none z-10"
        >
          {/* Simple text instead of FontAwesome */}
          <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            <Link href="/" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/" && "text-primary")} onClick={() => {setIsMenuOpen(false); scrollToTop();}}>Home</Link>
            <Link href="/about" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/about" && "text-primary")} onClick={() => {setIsMenuOpen(false); scrollToTop();}}>About</Link>
            <Link href="/event" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/event" && "text-primary")} onClick={() => {setIsMenuOpen(false); scrollToTop();}}>Event</Link>
            <Link href="/speakers" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/speakers" && "text-primary")} onClick={() => {setIsMenuOpen(false); scrollToTop();}}>Speakers</Link>
            <Link href="/feedback" className={cn("text-[#1E3D59] hover:text-primary py-2 border-b border-gray-100", location === "/feedback" && "text-primary")} onClick={() => {setIsMenuOpen(false); scrollToTop();}}>Feedback</Link>
            <Link href="/book" className="bg-primary text-white text-center py-2 rounded-full mt-2" onClick={() => {setIsMenuOpen(false); scrollToTop();}}>Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
