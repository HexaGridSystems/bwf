# Wedding Fraternity Website Documentation

## Project Overview

The Wedding Fraternity website serves as a platform for the Wedding Fraternity Meet-up 3.0 event scheduled for July 15, 2025. It provides information about the event, speakers, schedule, and venue, with functionality for users to register and pay for attendance.

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: wouter
- **State Management**: React Query for API calls
- **Form Handling**: React Hook Form with Zod validation
- **Payment Integration**: Razorpay
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM

## Project Structure

```
├── client              # Frontend code
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── hooks       # Custom React hooks
│   │   ├── lib         # Utilities, constants, types
│   │   ├── pages       # Page components for routing
│   │   ├── App.tsx     # Main app component and routing
│   │   └── main.tsx    # Entry point
├── server              # Backend code
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data storage layer
│   └── index.ts        # Server entry point
└── shared              # Shared code between client and server
    └── schema.ts       # Database schema definitions
```

## Component Architecture

| Component | Purpose | Relationships & Dependencies |
|-----------|---------|------------------------------|
| `App.tsx` | Main application component with routing | Contains Router component that renders all page components |
| `Navbar.tsx` | Navigation bar at the top of the site | Used across all pages, manages navigation state |
| `Hero.tsx` | Hero section on the homepage | Uses CountdownTimer component, displays event banner |
| `About.tsx` | Information about the Wedding Fraternity | Standalone section presented on About page |
| `EventInfo.tsx` | Details about the event (date, venue, etc.) | Used on EventPage, displays event data from constants |
| `EventSchedule.tsx` | Timeline of event activities | Used on EventPage, displays SCHEDULE_ITEMS from constants |
| `Speakers.tsx` | Profiles of event speakers | Used on SpeakersPage, displays SPEAKERS from constants |
| `Gallery.tsx` | Photo gallery of past events | Displays GALLERY_IMAGES from constants |
| `RsvpForm.tsx` | Registration form for the event | Uses PaymentButton for payment processing, Form components for inputs, makes API calls to register/create payment |
| `PaymentButton.tsx` | Interface with Razorpay payment gateway | Used within RsvpForm, processes payments via Razorpay |
| `Footer.tsx` | Site footer with contact info and map | Used across all pages, contains Google Maps integration |
| `CountdownTimer.tsx` | Displays countdown to event | Used by Hero component |
| `Faq.tsx` | Frequently asked questions | Displays FAQ_ITEMS from constants |
| `Venue.tsx` | Information about the event venue | Displays venue details and VENUE_AMENITIES from constants |

## Page Structure

| Page | URL | Components Used | Purpose |
|------|-----|-----------------|---------|
| Home | `/` | Hero, About, EventInfo, Speakers, Gallery, Sponsors | Landing page with overview |
| AboutPage | `/about` | About, Sponsors | Detailed information about the Wedding Fraternity |
| EventPage | `/event` | EventInfo, EventSchedule, Venue | Event details including schedule and venue information |
| SpeakersPage | `/speakers` | Speakers | Detailed information about the speakers |
| BookPage | `/book` | RsvpForm | Registration and payment page |
| FaqPage | `/faq` | Faq | Frequently asked questions |

## API Endpoints

| Endpoint | Method | Purpose | Request Body | Response |
|----------|--------|---------|-------------|----------|
| `/api/register` | POST | Register an attendee | Attendee data | `{success: boolean, data: Attendee, message?: string}` |
| `/api/payment/create-order` | POST | Create a payment order | `{amount, currency, receipt, notes}` | `{success: boolean, order: Order, message?: string}` |
| `/api/payment/verify` | POST | Verify a payment | `{orderId, paymentId, signature, attendeeId}` | `{success: boolean, message?: string}` |

## Database Models

### Attendees
Stores information about event registrants
- `id`: Primary key
- `name`: Attendee name
- `company`: Company/business name
- `email`: Email address
- `phone`: Phone number
- `role`: Role in wedding industry
- `expectations`: Optional feedback on expectations
- `registeredAt`: Registration timestamp
- `isPaid`: Payment status

### Contact Messages
Stores contact form submissions
- `id`: Primary key
- `name`: Contact name
- `email`: Email address
- `message`: Message content
- `sentAt`: Submission timestamp

### Subscribers
Stores newsletter subscriber information
- `id`: Primary key
- `email`: Subscriber email
- `subscribedAt`: Subscription timestamp

## Development Workflow

1. **Setup**: Clone the repository and install dependencies with `npm install`
2. **Development**: Start the development server with `npm run dev`
3. **Database**: Use Drizzle ORM for database operations through the storage interface
4. **Frontend Additions**: Add new components in the client/src/components directory
5. **API Additions**: Add new endpoints in server/routes.ts and implement handler logic
6. **Database Updates**: Update schema in shared/schema.ts and run migrations

## Payment Flow

1. User fills out the registration form (RsvpForm component)
2. Form data is validated using Zod schemas
3. On submission, attendee data is sent to `/api/register` endpoint
4. After successful registration, a payment order is created via `/api/payment/create-order`
5. The Razorpay payment popup is opened for the user
6. Upon successful payment, the payment is verified via `/api/payment/verify`
7. The user's payment status is updated in the database

## Deployment

The application is configured to be deployed on Vercel, with automatic deployments triggered by commits to the main branch of the repository.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `RAZORPAY_KEY_ID`: Razorpay API key ID for payment processing
- `RAZORPAY_KEY_SECRET`: Razorpay API key secret for payment verification

## CSS and Styling

The project uses Tailwind CSS for styling with the shadcn/ui component library. Theme customization is done through the theme.json file with a primary color palette of blue (#1E3D59) with gold accents (#F0C987).