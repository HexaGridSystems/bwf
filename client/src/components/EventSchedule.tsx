import { motion } from 'framer-motion';

const scheduleItems = [
  {
    time: '9:00 AM - 10:00 AM',
    title: 'Registration & Breakfast',
    description: 'Welcome coffee, tea, and light breakfast while networking with attendees',
    location: 'Main Hall',
    icon: 'fa-user-check',
    right: true
  },
  {
    time: '10:00 AM - 11:30 AM',
    title: 'Keynote: "Future of Wedding Industry"',
    description: 'Presented by Priya Sharma, Award-winning Wedding Planner',
    location: 'Auditorium',
    icon: 'fa-microphone',
    right: false
  },
  {
    time: '11:45 AM - 1:00 PM',
    title: 'Panel Discussion: "Collaboration in Wedding Industry"',
    description: 'Featuring top photographers, planners, and venue managers',
    location: 'Conference Room A',
    icon: 'fa-users',
    right: true
  },
  {
    time: '1:00 PM - 2:00 PM',
    title: 'Networking Lunch',
    description: 'Gourmet lunch with opportunity to connect with fellow professionals',
    location: 'Garden Area',
    icon: 'fa-utensils',
    right: false
  },
  {
    time: '2:15 PM - 3:45 PM',
    title: 'Workshop: "Creative Wedding Photography"',
    description: 'Hands-on session with renowned photographer Rajiv Menon',
    location: 'Studio Room',
    icon: 'fa-camera',
    right: true
  },
  {
    time: '4:00 PM - 5:30 PM',
    title: 'Closing Ceremony & Cocktail Networking',
    description: 'Awards presentation followed by cocktails and networking',
    location: 'Grand Hall',
    icon: 'fa-glass-cheers',
    right: false
  }
];

export default function EventSchedule() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Program</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Event Schedule</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            A carefully curated program designed to inspire, educate, and connect wedding professionals. From keynote speeches to hands-on workshops, there's something for everyone.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-primary bg-opacity-30 transform md:-translate-x-1/2"></div>
          
          {/* Timeline Events */}
          {scheduleItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="mb-10 flex flex-col md:flex-row items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`flex-1 order-2 ${item.right ? 'md:order-1 md:text-right md:pr-8' : 'md:order-3 md:pl-8'} mt-6 md:mt-0`}>
                {item.right ? (
                  <>
                    <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="flex md:justify-end">
                      <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full text-primary text-sm">{item.location}</span>
                    </div>
                  </>
                ) : (
                  <span className="font-montserrat font-semibold text-primary">{item.time}</span>
                )}
              </div>
              
              <div className="order-1 md:order-2 z-10 flex items-center justify-center w-8 h-8 md:mx-auto rounded-full bg-primary text-white font-bold">
                <i className={`fas ${item.icon} text-sm`}></i>
              </div>
              
              <div className={`flex-1 order-3 ${item.right ? 'md:order-3 md:pl-8' : 'md:order-1 md:text-right md:pr-8'} ${!item.right ? 'pl-6' : 'pl-6 md:pl-0'}`}>
                {item.right ? (
                  <span className="font-montserrat font-semibold text-primary">{item.time}</span>
                ) : (
                  <>
                    <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="flex">
                      <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full text-primary text-sm">{item.location}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              alert('This would download a PDF of the schedule in a real implementation.');
            }}
            className="inline-block px-6 py-3 bg-[#1E3D59] text-white rounded-full hover:bg-opacity-90 transition-colors duration-300"
          >
            <i className="fas fa-download mr-2"></i> Download Full Schedule
          </a>
        </div>
      </div>
    </section>
  );
}
