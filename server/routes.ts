import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAttendeeSchema, insertContactMessageSchema, insertSubscriberSchema, insertFeedbackSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { createOrder, verifyPayment, getOrderDetails, getPaymentDetails } from "./payments";

export async function registerRoutes(app: Express): Promise<Server> {
  // Event registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const data = insertAttendeeSchema.parse(req.body);
      const attendee = await storage.createAttendee(data);
      
      res.status(201).json({
        success: true,
        message: "Registration successful!",
        data: attendee
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to register. Please try again later."
        });
      }
    }
  });

  // Contact message endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        data: message
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again later."
        });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(data.email);
      
      if (existingSubscriber) {
        return res.status(409).json({
          success: false,
          message: "Email already subscribed to the newsletter."
        });
      }
      
      const subscriber = await storage.createSubscriber(data);
      
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter!",
        data: subscriber
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to subscribe. Please try again later."
        });
      }
    }
  });

  // Get registered attendees count
  app.get("/api/attendees/count", async (req, res) => {
    try {
      const count = await storage.getAttendeesCount();
      
      res.status(200).json({
        success: true,
        data: { count }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get attendees count."
      });
    }
  });

  // Feedback endpoints
  app.post("/api/feedback", async (req, res) => {
    try {
      const data = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(data);
      
      res.status(201).json({
        success: true,
        message: "Feedback submitted successfully!",
        data: feedback
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit feedback. Please try again later."
        });
      }
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const feedbacks = await storage.getAllFeedbacks();
      
      res.status(200).json({
        success: true,
        data: feedbacks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get feedbacks."
      });
    }
  });

  app.get("/api/feedback/average-rating", async (req, res) => {
    try {
      const averageRating = await storage.getAverageRating();
      
      res.status(200).json({
        success: true,
        data: { averageRating }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get average rating."
      });
    }
  });

  // Payment routes
  app.post("/api/payment/create-order", createOrder);
  app.post("/api/payment/verify", verifyPayment);
  app.get("/api/payment/order/:orderId", getOrderDetails);
  app.get("/api/payment/details/:paymentId", getPaymentDetails);

  const httpServer = createServer(app);
  return httpServer;
}
