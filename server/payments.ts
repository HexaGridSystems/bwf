import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { storage } from './storage';

// Initialize Razorpay with your key id and key secret
// Directly using the keys for troubleshooting purposes
const razorpay = new Razorpay({
  key_id: 'rzp_test_1QDacirIxfYGdY',
  key_secret: 'xkICVWxViSdX6262STt5tgV9',
});

// Create a new order
export async function createOrder(req: Request, res: Response) {
  try {
    const { amount, currency = 'INR', receipt, notes = {} } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      notes,
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Verify payment signature
export async function verifyPayment(req: Request, res: Response) {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    // Verify the payment signature
    const text = orderId + "|" + paymentId;
    // Directly using the key for troubleshooting purposes
    const secretKey = 'xkICVWxViSdX6262STt5tgV9';
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(text)
      .digest("hex");
    
    const isAuthentic = expectedSignature === signature;
    
    if (isAuthentic) {
      // If payment is verified, update the attendee's payment status
      if (req.body.attendeeId) {
        const attendeeId = parseInt(req.body.attendeeId);
        const updatedAttendee = await storage.updateAttendeePaymentStatus(attendeeId, true);
        
        if (updatedAttendee) {
          res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            data: { attendee: updatedAttendee }
          });
          return;
        }
      }
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Get order details by ID
export async function getOrderDetails(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const order = await razorpay.orders.fetch(orderId);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Get payment details by ID
export async function getPaymentDetails(req: Request, res: Response) {
  try {
    const { paymentId } = req.params;
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}