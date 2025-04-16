import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  attendeeId: number;
  name: string;
  email: string;
  phone: string;
  amount: number; // in INR
  description: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function PaymentButton({
  attendeeId,
  name,
  email,
  phone,
  amount,
  description,
  onSuccess,
  onFailure,
}: PaymentButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/payment/create-order', {
        amount,
        currency: 'INR',
        receipt: `receipt_${attendeeId}_${Date.now()}`,
        notes: {
          attendeeId,
          name,
          email,
          phone,
          description
        }
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        initiatePayment(data.order);
      } else {
        toast({
          title: 'Payment Failed',
          description: data.message || 'Unable to create payment order',
          variant: 'destructive',
        });
        setIsLoading(false);
        onFailure?.();
      }
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      toast({
        title: 'Payment Failed',
        description: 'Unable to initialize payment. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      onFailure?.();
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
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully!',
          variant: 'default',
        });
        onSuccess?.();
      } else {
        toast({
          title: 'Payment Verification Failed',
          description: data.message || 'Unable to verify payment',
          variant: 'destructive',
        });
        onFailure?.();
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error verifying payment:', error);
      toast({
        title: 'Payment Verification Failed',
        description: 'Unable to verify your payment. Please contact support.',
        variant: 'destructive',
      });
      setIsLoading(false);
      onFailure?.();
    },
  });

  const initiatePayment = (order: any) => {
    const options = {
      key: 'rzp_test_1QDacirIxfYGdY', // Directly using the key for troubleshooting purposes
      amount: order.amount,
      currency: order.currency,
      name: 'Bengaluru Wedding Fraternity',
      description,
      order_id: order.id,
      handler: function (response: any) {
        // Payment successful, verify with server
        verifyPaymentMutation.mutate({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          attendeeId
        });
      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        attendeeId,
      },
      theme: {
        color: '#1E3D59',
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
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
      setIsLoading(false);
      onFailure?.();
    }
  };

  const handlePaymentClick = () => {
    setIsLoading(true);
    createOrderMutation.mutate();
  };

  return (
    <Button
      onClick={handlePaymentClick}
      disabled={isLoading}
      className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-full transition-colors duration-300"
    >
      {isLoading ? 'Processing...' : 'Pay Now ₹' + amount.toFixed(2)}
    </Button>
  );
}