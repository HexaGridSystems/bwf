import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Image URLs for the hero slider
  const slides = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  useEffect(() => {
    // Slider functionality could be expanded here if we had multiple slides
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <section id="hero" className="relative h-screen max-h-[800px] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      
      <div className="hero-slider relative h-full w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${slides[currentSlide]})` }}
        />
      </div>
      
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-['Great_Vibes'] text-[#F0C987] text-3xl md:text-4xl mb-2">Welcome to the</span>
        <h1 className="font-['Playfair_Display'] text-white text-4xl md:text-6xl font-bold mb-4">Bengaluru Wedding <br className="hidden sm:block" /> Fraternity</h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mb-8">Annual Networking Event for Wedding Professionals</p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <a href="#book" className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full text-lg transition-colors duration-300">Book Now</a>
        </div>
        
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <p className="text-white text-lg mb-4">Event Starts In</p>
          <CountdownTimer targetDate="November 15, 2023 09:00:00" />
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-6">
        <a href="#about" className="text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
