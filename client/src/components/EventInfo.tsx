import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function EventInfo() {
  return (
    <section id="event" className="py-16 md:py-24 bg-[#1E3D59] bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Join Us</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Event Information</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Our annual event brings together the best talent in the wedding industry for a day of learning, networking, and celebration. Mark your calendar and prepare for an unforgettable experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-alt text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold">Event Date & Time</h3>
                  <p className="text-gray-600">July 15, 2025 • 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold">Venue</h3>
                  <p className="text-gray-600">PRINCESS SHRINE</p>
                  <p className="text-gray-600">Mekhri circle, Bellary Rd, Bengaluru</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-ticket-alt text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold">Registration Fee</h3>
                  <p className="text-gray-600">₹1,000 per person</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-users text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold">Capacity</h3>
                  <p className="text-gray-600">Limited to 200 attendees</p>
                </div>
              </div>
              
              <div className="mt-8">
                <a href="#rsvp" className="block w-full bg-primary hover:bg-opacity-90 text-white text-center py-3 rounded-full transition-colors duration-300">Reserve Your Spot</a>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Event venue" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1E3D59]/80 to-[#1E3D59]/70">
                <h3 className="text-white font-['Playfair_Display'] text-2xl font-bold mb-2">PRINCESS SHRINE</h3>
                <p className="text-white text-sm">Premium venue for exclusive events</p>
                <a href="#venue" className="text-[#F0C987] hover:text-white transition-colors duration-300 mt-2 inline-block">
                  View on map <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
