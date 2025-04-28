import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import { motion } from 'framer-motion';

interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export default function FeedbackPage() {
  const [averageRating, setAverageRating] = useState<number>(0);

  const { data: feedbackData } = useQuery({
    queryKey: ['/api/feedback'],
    enabled: true,
  });

  const { data: ratingData } = useQuery({
    queryKey: ['/api/feedback/average-rating'],
    enabled: true,
  });

  useEffect(() => {
    if (ratingData?.data?.averageRating) {
      setAverageRating(ratingData.data.averageRating);
    }
  }, [ratingData]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const renderAverageRating = () => {
    if (averageRating === 0) return null;
    
    return (
      <div className="mb-8 text-center">
        <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold mb-2">
          Overall Event Rating
        </h3>
        <div className="flex items-center justify-center mb-2">
          {renderStars(Math.round(averageRating))}
        </div>
        <p className="text-xl font-bold text-primary">
          {averageRating.toFixed(1)} <span className="text-gray-600 font-normal text-sm">/ 5</span>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      
      <div className="py-8"></div> {/* Spacer for top of page */}
      
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mb-4">
              Event Feedback
            </h2>
            <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Help us improve the Bengaluru Wedding Fraternity events by sharing your thoughts and experiences.
            </p>
          </motion.div>

          {renderAverageRating()}
          
          {feedbackData?.data && feedbackData.data.length > 0 && (
            <div className="mb-16">
              <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold text-center mb-8">
                What Attendees Are Saying
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbackData.data.map((feedback: Feedback) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-lg shadow border border-gray-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {feedback.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                        <div className="flex mt-1">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                    </div>
                    
                    {feedback.comment && (
                      <p className="text-gray-600 text-sm italic">{feedback.comment}</p>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-4">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <FeedbackForm />
      
      <Footer />
    </div>
  );
}