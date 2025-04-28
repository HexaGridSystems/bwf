import { attendees, contactMessages, subscribers, feedbacks, type InsertAttendee, type Attendee, type InsertContactMessage, type ContactMessage, type InsertSubscriber, type Subscriber, type InsertFeedback, type Feedback } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Attendee methods
  createAttendee(attendee: InsertAttendee): Promise<Attendee>;
  getAttendee(id: number): Promise<Attendee | undefined>;
  getAttendeeByEmail(email: string): Promise<Attendee | undefined>;
  getAllAttendees(): Promise<Attendee[]>;
  getAttendeesCount(): Promise<number>;
  updateAttendeePaymentStatus(id: number, isPaid: boolean): Promise<Attendee | undefined>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getAllSubscribers(): Promise<Subscriber[]>;

  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedbacks(): Promise<Feedback[]>;
  getAverageRating(): Promise<number>;
}

export class MemStorage implements IStorage {
  private attendees: Map<number, Attendee>;
  private contactMessages: Map<number, ContactMessage>;
  private subscribers: Map<number, Subscriber>;
  private feedbacks: Map<number, Feedback>;
  private attendeeId: number;
  private messageId: number;
  private subscriberId: number;
  private feedbackId: number;

  constructor() {
    this.attendees = new Map();
    this.contactMessages = new Map();
    this.subscribers = new Map();
    this.feedbacks = new Map();
    this.attendeeId = 1;
    this.messageId = 1;
    this.subscriberId = 1;
    this.feedbackId = 1;
  }

  // Attendee methods
  async createAttendee(attendeeData: InsertAttendee): Promise<Attendee> {
    const id = this.attendeeId++;
    const now = new Date();
    
    // Ensure expectations is never undefined
    const expectations = attendeeData.expectations === undefined ? null : attendeeData.expectations;
    
    const attendee: Attendee = {
      ...attendeeData,
      expectations,
      id,
      registeredAt: now,
      isPaid: false
    };
    
    this.attendees.set(id, attendee);
    return attendee;
  }

  async getAttendee(id: number): Promise<Attendee | undefined> {
    return this.attendees.get(id);
  }

  async getAttendeeByEmail(email: string): Promise<Attendee | undefined> {
    for (const attendee of this.attendees.values()) {
      if (attendee.email === email) {
        return attendee;
      }
    }
    return undefined;
  }

  async getAllAttendees(): Promise<Attendee[]> {
    return Array.from(this.attendees.values());
  }

  async getAttendeesCount(): Promise<number> {
    return this.attendees.size;
  }
  
  async updateAttendeePaymentStatus(id: number, isPaid: boolean): Promise<Attendee | undefined> {
    const attendee = this.attendees.get(id);
    if (!attendee) return undefined;
    
    const updatedAttendee: Attendee = {
      ...attendee,
      isPaid
    };
    
    this.attendees.set(id, updatedAttendee);
    return updatedAttendee;
  }

  // Contact message methods
  async createContactMessage(messageData: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageId++;
    const now = new Date();
    
    const message: ContactMessage = {
      ...messageData,
      id,
      createdAt: now
    };
    
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Subscriber methods
  async createSubscriber(subscriberData: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberId++;
    const now = new Date();
    
    const subscriber: Subscriber = {
      ...subscriberData,
      id,
      subscribedAt: now
    };
    
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    for (const subscriber of this.subscribers.values()) {
      if (subscriber.email === email) {
        return subscriber;
      }
    }
    return undefined;
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  // Feedback methods
  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackId++;
    const now = new Date();
    
    // Ensure comment is never undefined
    const comment = feedbackData.comment === undefined ? null : feedbackData.comment;
    
    const feedback: Feedback = {
      ...feedbackData,
      comment,
      id,
      createdAt: now
    };
    
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values());
  }

  async getAverageRating(): Promise<number> {
    const feedbacks = Array.from(this.feedbacks.values());
    if (feedbacks.length === 0) return 0;
    
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return sum / feedbacks.length;
  }
}

export class DatabaseStorage implements IStorage {
  // Attendee methods
  async createAttendee(attendeeData: InsertAttendee): Promise<Attendee> {
    // Ensure expectations is never undefined
    const expectations = attendeeData.expectations === undefined ? null : attendeeData.expectations;
    
    const [attendee] = await db
      .insert(attendees)
      .values({
        ...attendeeData,
        expectations
      })
      .returning();
    return attendee;
  }

  async getAttendee(id: number): Promise<Attendee | undefined> {
    const [attendee] = await db
      .select()
      .from(attendees)
      .where(eq(attendees.id, id));
    return attendee;
  }

  async getAttendeeByEmail(email: string): Promise<Attendee | undefined> {
    const [attendee] = await db
      .select()
      .from(attendees)
      .where(eq(attendees.email, email));
    return attendee;
  }

  async getAllAttendees(): Promise<Attendee[]> {
    return await db.select().from(attendees);
  }

  async getAttendeesCount(): Promise<number> {
    const result = await db.select().from(attendees);
    return result.length;
  }
  
  async updateAttendeePaymentStatus(id: number, isPaid: boolean): Promise<Attendee | undefined> {
    const [updatedAttendee] = await db
      .update(attendees)
      .set({ isPaid })
      .where(eq(attendees.id, id))
      .returning();
    
    return updatedAttendee;
  }

  // Contact message methods
  async createContactMessage(messageData: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(messageData)
      .returning();
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  // Subscriber methods
  async createSubscriber(subscriberData: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db
      .insert(subscribers)
      .values(subscriberData)
      .returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    return subscriber;
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers);
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
