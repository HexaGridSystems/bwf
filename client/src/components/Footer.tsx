import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const quickLinks = [
  { name: 'About BWF', href: '#about' },
  { name: 'Event Information', href: '#event' },
  { name: 'Speakers', href: '#speakers' },
  { name: 'Event Schedule', href: '#schedule' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'FAQs', href: '#faq' },
  { name: 'Register Now', href: '#rsvp' }
];

export default function Footer() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: ''
    }
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: SubscribeFormValues) => {
      const response = await apiRequest('POST', '/api/subscribe', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed",
        description: "Thank you for subscribing to our newsletter!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  function onSubmit(data: SubscribeFormValues) {
    setIsSubmitting(true);
    subscribeMutation.mutate(data);
  }

  return (
    <footer className="bg-[#1E3D59] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="font-['Great_Vibes'] text-primary text-xl">BWF</span>
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold leading-none">Bengaluru</h4>
                <p className="font-['Great_Vibes'] text-[#F0C987] text-sm">Wedding Fraternity</p>
              </div>
            </div>
            <p className="text-white text-sm opacity-80 mb-4">
              Uniting wedding professionals to elevate the industry standards and create exceptional experiences for couples.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-sm opacity-80 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">info@bengaluruweddings.org</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">+91 80 1234 5678</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">
                  123 Wedding Boulevard<br />
                  Whitefield, Bengaluru 560066
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-white text-sm opacity-80 mb-4">
              Subscribe to our newsletter to receive updates about upcoming events and industry news.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your email address"
                          className="px-4 py-2 rounded-l-md w-full focus:outline-none text-[#1E3D59] border-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-opacity-90 px-4 py-2 rounded-r-md transition-colors duration-300 h-10"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </form>
            </Form>
            <p className="text-white text-xs opacity-60">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E3D59]/30 text-center">
          <p className="text-white text-sm opacity-70">
            &copy; 2023 Bengaluru Wedding Fraternity. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
