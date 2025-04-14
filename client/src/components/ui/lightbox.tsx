import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImageType } from '@/lib/types';

interface LightboxProps {
  images: GalleryImageType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, currentIndex, setCurrentIndex, onClose }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the current image
    const img = new Image();
    img.src = images[currentIndex].src;
    img.onload = () => setIsLoading(false);
    
    // Listen for escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [currentIndex, images, onClose]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button 
          className="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors duration-300"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-primary transition-colors duration-300"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div
          className="relative max-w-4xl max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-[80vh] object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 text-center p-4 bg-black bg-opacity-50 text-white">
            <p>{images[currentIndex].alt}</p>
            <p className="text-sm opacity-70">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
        
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-primary transition-colors duration-300"
          onClick={handleNext}
          aria-label="Next image"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
