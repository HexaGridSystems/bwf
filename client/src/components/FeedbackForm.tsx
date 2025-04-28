import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FeedbackForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 5, // Start with highest rating as default
      comment: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest('POST', '/api/feedback', data);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit feedback');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Thank you!',
        description: 'Your feedback has been submitted successfully.',
      });
      setSubmitted(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data);
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue('rating', rating);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 text-primary text-5xl">🎉</div>
        <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold mb-4">
          Thank You for Your Feedback!
        </h3>
        <p className="text-gray-600 mb-6">
          We appreciate you taking the time to share your thoughts with us.
        </p>
        <Button
          type="button"
          onClick={() => setSubmitted(false)}
          className="bg-primary hover:bg-opacity-90 text-white py-2 px-6 rounded-full transition-colors duration-300"
        >
          Submit Another Feedback
        </Button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mb-4">
            Share Your Feedback
          </h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We'd love to hear about your experience with the Bengaluru Wedding Fraternity event. 
            Your feedback helps us improve future events.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Full Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Email Address*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Rate Your Experience*</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center space-x-3 py-3">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleRatingClick(rating)}
                              className={`text-3xl ${
                                (selectedRating && rating <= selectedRating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              aria-label={`Rate ${rating} out of 5 stars`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Please share any additional thoughts or suggestions..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
                >
                  {isPending ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}