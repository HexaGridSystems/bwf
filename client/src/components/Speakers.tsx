import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const speakers = [
  {
    name: 'Priya Sharma',
    role: 'Celebrity Wedding Planner',
    description: 'With over 15 years of experience planning luxury weddings for celebrities and high-profile clients across India.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Rajiv Menon',
    role: 'Award-Winning Photographer',
    description: 'Internationally recognized for his unique approach to capturing wedding moments with artistic flair.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Ananya Desai',
    role: 'Decor Specialist',
    description: 'Known for creating breathtaking wedding venues through innovative decor and thematic designs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Vikram Malhotra',
    role: 'Luxury Venue Director',
    description: 'Managing partner of The Grand Pavilion, specializing in high-end wedding experiences.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Meera Kapoor',
    role: 'Bridal Fashion Expert',
    description: 'Fashion designer specializing in contemporary bridal wear that blends tradition with modernity.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Arjun Nair',
    role: 'Culinary Director',
    description: 'Master chef creating innovative wedding menus that blend international techniques with local flavors.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  }
];

export default function Speakers() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="speakers" className="py-16 md:py-24 bg-[#1E3D59] bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Meet</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Our Speakers</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Learn from the best in the industry. Our speakers are renowned professionals who will share their expertise, insights, and experiences.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {speakers.map((speaker, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
            >
              <Card className="overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-xl font-semibold mb-1">{speaker.name}</h3>
                  <p className="text-primary font-medium mb-3">{speaker.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{speaker.description}</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="text-[#1E3D59] hover:text-primary transition-colors duration-300">
                      <i className="fas fa-globe"></i>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
