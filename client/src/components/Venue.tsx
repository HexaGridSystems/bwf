import { motion } from 'framer-motion';

const amenities = [
  { name: 'Free Wi-Fi' },
  { name: 'Complimentary Parking' },
  { name: 'AV Equipment' },
  { name: 'Catering Services' },
  { name: 'Outdoor Garden' },
  { name: 'Wheelchair Accessible' }
];

export default function Venue() {
  return (
    <section id="venue" className="py-16 md:py-24 bg-[#1E3D59] bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Location</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Event Venue</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            The Grand Pavilion is one of Bengaluru's premier event venues, offering state-of-the-art facilities in a luxurious setting.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
              {/* Map placeholder */}
              <img 
                src="https://via.placeholder.com/800x600?text=Google+Map+of+The+Grand+Pavilion" 
                alt="Map of event venue" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                >
                  <i className="fas fa-directions mr-2"></i> Get Directions
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold mb-4">The Grand Pavilion</h3>
            <div className="flex items-start mb-4">
              <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
              <p className="text-gray-600">
                123 Wedding Boulevard<br />
                Whitefield, Bengaluru 560066<br />
                Karnataka, India
              </p>
            </div>
            
            <div className="flex items-start mb-4">
              <i className="fas fa-phone-alt text-primary mt-1 mr-3"></i>
              <p className="text-gray-600">+91 80 1234 5678</p>
            </div>
            
            <div className="flex items-start mb-6">
              <i className="fas fa-envelope text-primary mt-1 mr-3"></i>
              <p className="text-gray-600">events@grandpavilion.com</p>
            </div>
            
            <h4 className="font-['Playfair_Display'] text-[#1E3D59] text-xl font-semibold mb-3">Venue Amenities</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  <span className="text-gray-600">{amenity.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
