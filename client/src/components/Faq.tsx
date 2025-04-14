import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: 'Who can attend this event?',
    answer: 'This event is open to all wedding industry professionals including photographers, planners, decorators, caterers, venue managers, bridal fashion designers, and anyone working in the wedding ecosystem in Bengaluru.'
  },
  {
    question: 'What is included in the registration fee?',
    answer: 'The registration fee includes access to all sessions, workshops, and panel discussions. It also covers breakfast, lunch, coffee breaks, and the networking cocktail hour. Additionally, attendees will receive a welcome kit with event materials.'
  },
  {
    question: 'Is there a dress code for the event?',
    answer: 'We recommend business casual attire for the daytime sessions. For the evening networking cocktail, smart business attire is appropriate. Comfortable shoes are recommended as there will be opportunities to move around and network throughout the venue.'
  },
  {
    question: 'Can I get a refund if I can\'t attend?',
    answer: 'Refunds are available up to 14 days before the event with a 15% processing fee. Within 14 days of the event, we cannot offer refunds but you may transfer your registration to another professional. Please contact us to arrange a transfer.'
  },
  {
    question: 'Is parking available at the venue?',
    answer: 'Yes, complimentary parking is available at The Grand Pavilion. There are 200 parking spots available on a first-come, first-served basis. We also recommend carpooling or using ride-sharing services as the event is expected to reach full capacity.'
  },
  {
    question: 'Will there be opportunities to promote my business?',
    answer: 'Absolutely! There will be a dedicated networking area where you can display business cards and brochures. For more formal exhibition opportunities, please check our sponsorship packages which include booth space and presentation opportunities.'
  }
];

export default function Faq() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Questions</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Find answers to commonly asked questions about the event. If you don't see your question here, please contact us.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 text-left bg-white hover:bg-gray-50 font-['Playfair_Display'] text-[#1E3D59] text-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
