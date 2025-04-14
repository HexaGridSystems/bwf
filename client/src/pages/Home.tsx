import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EventInfo from '@/components/EventInfo';
import EventSchedule from '@/components/EventSchedule';
import Speakers from '@/components/Speakers';
import Gallery from '@/components/Gallery';
import Sponsors from '@/components/Sponsors';
import Faq from '@/components/Faq';
import Venue from '@/components/Venue';
import RsvpForm from '@/components/RsvpForm';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Set up smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <Hero />
      <About />
      <EventInfo />
      <EventSchedule />
      <Speakers />
      <Gallery />
      <Sponsors />
      <Faq />
      <Venue />
      <RsvpForm />
      <Footer />
    </div>
  );
}
