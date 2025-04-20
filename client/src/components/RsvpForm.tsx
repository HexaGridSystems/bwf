import { useState, useEffect } from 'react';
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
import PaymentButton from './PaymentButton';
import { loadRazorpayScript } from '@/lib/loadRazorpay';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  role: z.string().min(1, 'Please select your role'),
  expectations: z.string().nullable(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RsvpForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredAttendee, setRegisteredAttendee] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script on component mount
    loadRazorpayScript().then((success) => {
      if (success) {
        setRazorpayLoaded(true);
      } else {
        console.error('Failed to load Razorpay script');
        toast({
          title: 'Warning',
          description: 'Payment gateway failed to load. You may need to try again later.',
          variant: 'destructive',
        });
      }
    });
  }, [toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      role: '',
      expectations: null,
      terms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const { terms, ...formData } = data;
      const response = await apiRequest('POST', '/api/register', formData);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setRegisteredAttendee(data.data);
        setShowPayment(true);
        toast({
          title: "Registration Successful",
          description: "Thank you for registering! Please proceed with payment to confirm your spot.",
          variant: "default",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "There was an error submitting your registration. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    registerMutation.mutate(data);
  }
  
  function handlePaymentSuccess() {
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully. Looking forward to seeing you at the event!",
      variant: "default",
    });
    // Reset form and state after successful payment
    form.reset();
    setRegisteredAttendee(null);
    setShowPayment(false);
    setIsSubmitting(false);
  }
  
  function handlePaymentFailure() {
    toast({
      title: "Payment Failed",
      description: "Your spot is reserved, but the payment was not completed. You can try again later.",
      variant: "destructive",
    });
    setIsSubmitting(false);
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
                          value={field.value || ''} 
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
                
                {showPayment && registeredAttendee ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-700 text-sm">
                        Registration successful! Please complete your payment to secure your spot.
                      </p>
                    </div>
                    {razorpayLoaded ? (
                      <PaymentButton
                        attendeeId={registeredAttendee.id}
                        name={registeredAttendee.name}
                        email={registeredAttendee.email}
                        phone={registeredAttendee.phone}
                        amount={1000} // Price ₹1000 per person
                        description="Bengaluru Wedding Fraternity Annual Event Registration"
                        onSuccess={handlePaymentSuccess}
                        onFailure={handlePaymentFailure}
                      />
                    ) : (
                      <Button 
                        disabled={true}
                        className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
                      >
                        Loading Payment Gateway...
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
                  >
                    {isSubmitting ? 'Processing...' : 'Book & Pay Now'}
                  </Button>
                )}
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Fields marked with * are required
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
