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
import { loadRazorpayScript } from '@/lib/loadRazorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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

  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/payment/verify', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: 'Registration Complete',
          description: 'Thank you! Your registration and payment have been processed successfully.',
          variant: 'default',
        });
        form.reset();
      } else {
        toast({
          title: 'Payment Verification Failed',
          description: data.message || 'Unable to verify payment',
          variant: 'destructive',
        });
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Error verifying payment:', error);
      toast({
        title: 'Payment Verification Failed',
        description: 'Unable to verify your payment. Please contact support.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    },
  });

  // Function to initiate Razorpay payment
  const initiatePayment = (attendee: any, order: any) => {
    const options = {
      key: 'rzp_test_1QDacirIxfYGdY', // Directly using the key for testing
      amount: order.amount,
      currency: order.currency,
      name: 'Wedding Fraternity',
      description: "Annual Event Registration",
      order_id: order.id,
      handler: function (response: any) {
        // Payment successful, verify with server
        verifyPaymentMutation.mutate({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          attendeeId: attendee.id
        });
      },
      prefill: {
        name: attendee.name,
        email: attendee.email,
        contact: attendee.phone,
      },
      notes: {
        attendeeId: attendee.id,
      },
      theme: {
        color: '#1E3D59',
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
          toast({
            title: 'Payment Cancelled',
            description: 'You have cancelled the payment process.',
            variant: 'default',
          });
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Failed to load Razorpay:', error);
      toast({
        title: 'Payment Failed',
        description: 'Unable to load payment gateway. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const registerAndPayMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // 1. Register the attendee
      const { terms, ...formData } = data;
      const registerResponse = await apiRequest('POST', '/api/register', formData);
      const registerData = await registerResponse.json();
      
      if (!registerData.success) {
        throw new Error(registerData.message || "Registration failed");
      }
      
      const attendee = registerData.data;
      
      // 2. Create a payment order
      const orderResponse = await apiRequest('POST', '/api/payment/create-order', {
        amount: 1000, // ₹1000 per person
        currency: 'INR',
        receipt: `receipt_${attendee.id}_${Date.now()}`,
        notes: {
          attendeeId: attendee.id,
          name: attendee.name,
          email: attendee.email,
          phone: attendee.phone,
          description: "Wedding Fraternity Annual Event Registration"
        }
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order");
      }
      
      // Return both the attendee and order information
      return {
        attendee,
        order: orderData.order
      };
    },
    onSuccess: (data) => {
      // Initiate the Razorpay payment flow
      initiatePayment(data.attendee, data.order);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  function onSubmit(data: FormValues) {
    if (!razorpayLoaded) {
      toast({
        title: "Payment Gateway Not Ready",
        description: "The payment gateway is still loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    registerAndPayMutation.mutate(data);
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
          <h2 className="font-['Playfair_Display'] text-[#1E3D59] text-3xl md:text-4xl font-bold mt-2 mb-6">Book Your Spot</h2>
          <div className="w-20 h-1 bg-[#F0C987] mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Secure your place at the Wedding Fraternity Annual Event. Limited seats available, book today!
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="font-['Playfair_Display'] text-[#1E3D59] text-2xl font-semibold mb-4">Book Now</h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
                  <p className="text-blue-700 text-sm">
                    Event registration fee: ₹1000 per person. Payment will be processed securely after completing this form.
                  </p>
                </div>
                
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
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !razorpayLoaded}
                  className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
                >
                  {isSubmitting ? 'Processing...' : !razorpayLoaded ? 'Loading Payment Gateway...' : 'Register & Pay ₹1000'}
                </Button>
                
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