import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function About() {
  const featureItems = [
    {
      icon: 'fa-handshake',
      title: 'Networking',
      description: 'Connect with other professionals in the wedding industry and build valuable relationships.'
    },
    {
      icon: 'fa-lightbulb',
      title: 'Knowledge Sharing',
      description: 'Learn from experts and share your insights to enhance the wedding experience for clients.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Industry Growth',
      description: 'Collectively elevate standards and promote sustainable growth in the wedding industry.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Discover</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">About The Bengaluru Wedding Fraternity</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            The Bengaluru Wedding Fraternity is a collaborative community of wedding professionals dedicated to elevating the wedding industry in Bangalore. We bring together photographers, planners, decorators, caterers, and other service providers to network, learn, and grow together.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featureItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
                  <i className={`fas ${item.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
