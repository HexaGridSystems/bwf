import { motion } from 'framer-motion';

const sponsors = [
  { name: 'Luxury Venues', logo: 'https://via.placeholder.com/180x90?text=Luxury+Venues' },
  { name: 'Elegant Decor', logo: 'https://via.placeholder.com/180x90?text=Elegant+Decor' },
  { name: 'Bridal Fashions', logo: 'https://via.placeholder.com/180x90?text=Bridal+Fashions' },
  { name: 'Camera Pro', logo: 'https://via.placeholder.com/180x90?text=Camera+Pro' },
  { name: 'Wedding Magazine', logo: 'https://via.placeholder.com/180x90?text=Wedding+Magazine' },
  { name: 'Catering Delights', logo: 'https://via.placeholder.com/180x90?text=Catering+Delights' },
  { name: 'Event Technology', logo: 'https://via.placeholder.com/180x90?text=Event+Technology' },
  { name: 'Travel Partners', logo: 'https://via.placeholder.com/180x90?text=Travel+Partners' }
];

export default function Sponsors() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#1E3D59] bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Thank You</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Our Sponsors</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            We are grateful to our sponsors who make this event possible. Their support enables us to bring together the wedding community.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg p-6 flex items-center justify-center h-32 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              variants={itemVariants}
            >
              <img src={sponsor.logo} alt={sponsor.name} className="max-h-16" />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-block text-primary hover:text-[#1E3D59] transition-colors duration-300">
            Interested in becoming a sponsor? <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
