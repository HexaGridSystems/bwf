import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  role: z.string().min(1, 'Please select your role'),
  expectations: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RsvpForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      role: '',
      expectations: '',
      terms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const { terms, ...formData } = data;
      const response = await apiRequest('POST', '/api/register', formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering! We look forward to seeing you at the event.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    registerMutation.mutate(data);
  }

  return (
    <section id="book" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-['Great_Vibes'] text-primary text-3xl">Join Us</span>
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Book Your Spot</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Secure your place at the Bengaluru Wedding Fraternity Annual Event. Limited seats available, book today!
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-[#1E3D59]">
              <h3 className="font-['Playfair_Display'] text-white text-2xl font-semibold mb-4">Event Details</h3>
              <div className="flex items-start mb-4">
                <i className="fas fa-calendar-alt text-[#F0C987] mt-1 mr-3"></i>
                <div>
                  <p className="text-white font-semibold">Date & Time</p>
                  <p className="text-white text-sm">November 15, 2023</p>
                  <p className="text-white text-sm">9:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <i className="fas fa-map-marker-alt text-[#F0C987] mt-1 mr-3"></i>
                <div>
                  <p className="text-white font-semibold">Venue</p>
                  <p className="text-white text-sm">The Grand Pavilion</p>
                  <p className="text-white text-sm">Whitefield, Bengaluru</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <i className="fas fa-ticket-alt text-[#F0C987] mt-1 mr-3"></i>
                <div>
                  <p className="text-white font-semibold">Registration Fee</p>
                  <p className="text-white text-sm">Early Bird (until Oct 15): ₹1,800</p>
                  <p className="text-white text-sm">Regular: ₹2,500</p>
                </div>
              </div>
              
              <div className="border-t border-[#1E3D59]/30 pt-6">
                <p className="text-white text-sm italic mb-4">
                  "This event helped me connect with some amazing wedding professionals. Highly recommended for anyone in the industry."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                    alt="Testimonial" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-white text-sm font-semibold">Ravi Kumar</p>
                    <p className="text-white text-xs opacity-70">Wedding Photographer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold mb-4">Book Now</h3>
                  
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
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Company/Business Name*</FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Phone Number*</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Your Role in Wedding Industry*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="photographer">Photographer</SelectItem>
                            <SelectItem value="planner">Wedding Planner</SelectItem>
                            <SelectItem value="decorator">Decorator/Designer</SelectItem>
                            <SelectItem value="venue">Venue Manager</SelectItem>
                            <SelectItem value="caterer">Caterer</SelectItem>
                            <SelectItem value="fashion">Bridal Fashion</SelectItem>
                            <SelectItem value="makeup">Makeup Artist</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="expectations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">What do you hope to learn or achieve at this event?</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-700 text-sm">
                            I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>.*
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
                  >
                    {isSubmitting ? 'Processing...' : 'Book & Pay Now'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Fields marked with * are required
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
