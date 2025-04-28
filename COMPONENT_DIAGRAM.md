# Wedding Fraternity Component Relationships

## Component Hierarchy

```
App
├── Router
│   ├── Home (/)
│   │   ├── Navbar
│   │   ├── Hero
│   │   │   └── CountdownTimer
│   │   ├── About
│   │   ├── EventInfo
│   │   ├── Speakers
│   │   ├── Gallery
│   │   ├── Sponsors
│   │   └── Footer
│   │       └── GoogleMap (iframe)
│   │
│   ├── AboutPage (/about)
│   │   ├── Navbar
│   │   ├── About
│   │   ├── Sponsors
│   │   └── Footer
│   │
│   ├── EventPage (/event)
│   │   ├── Navbar
│   │   ├── EventInfo
│   │   ├── EventSchedule
│   │   ├── Venue
│   │   └── Footer
│   │
│   ├── SpeakersPage (/speakers)
│   │   ├── Navbar
│   │   ├── Speakers
│   │   └── Footer
│   │
│   ├── BookPage (/book)
│   │   ├── Navbar
│   │   ├── RsvpForm
│   │   │   ├── Form Components (FormField, Input, Select, etc.)
│   │   │   └── PaymentButton
│   │   │       └── Razorpay Integration
│   │   └── Footer
│   │
│   ├── FaqPage (/faq)
│   │   ├── Navbar
│   │   ├── Faq
│   │   └── Footer
│   │
│   └── NotFound (404)
│       ├── Navbar
│       └── Footer
```

## Component Data Flow

```
┌─────────────────┐      ┌────────────────────┐      ┌────────────────┐
│                 │      │                    │      │                │
│  constants.ts   │──────▶  Page Components   │──────▶  UI Components │
│  (Static Data)  │      │  (Data Assembly)   │      │  (Rendering)   │
│                 │      │                    │      │                │
└─────────────────┘      └────────────────────┘      └────────────────┘
                                   │
                                   │
                                   ▼
        ┌───────────────────────────────────────────┐
        │                                           │
        │  API Calls (Registration, Payment, etc.)  │
        │                                           │
        └───────────────────────────────────────────┘
                    │                 ▲
                    │                 │
                    ▼                 │
        ┌───────────────────────────────────────┐
        │                                       │
        │  server/routes.ts (API Controllers)   │
        │                                       │
        └───────────────────────────────────────┘
                    │                 ▲
                    │                 │
                    ▼                 │
        ┌───────────────────────────────────────┐
        │                                       │
        │  server/storage.ts (Data Access)      │
        │                                       │
        └───────────────────────────────────────┘
                    │                 ▲
                    │                 │
                    ▼                 │
        ┌───────────────────────────────────────┐
        │                                       │
        │  Database (PostgreSQL)                │
        │                                       │
        └───────────────────────────────────────┘
```

## Detailed Component Relationships

| Component | Parent Components | Child Components | State Management | External Dependencies |
|-----------|-------------------|------------------|-----------------|----------------------|
| `Navbar` | App | - | Local state for mobile menu, scroll detection | wouter (for navigation) |
| `Hero` | Home | CountdownTimer | - | EVENT_DATE from constants |
| `CountdownTimer` | Hero | - | Local state for time calculation | - |
| `About` | Home, AboutPage | - | - | - |
| `EventInfo` | Home, EventPage | - | - | EVENT_DATE, EVENT_LOCATION from constants |
| `EventSchedule` | EventPage | - | - | SCHEDULE_ITEMS from constants |
| `Speakers` | Home, SpeakersPage | - | - | SPEAKERS from constants |
| `Gallery` | Home | - | Local state for lightbox | GALLERY_IMAGES from constants |
| `Sponsors` | Home, AboutPage | - | - | SPONSORS from constants |
| `Faq` | FaqPage | - | - | FAQ_ITEMS from constants |
| `Venue` | EventPage | - | - | EVENT_ADDRESS, VENUE_AMENITIES from constants |
| `RsvpForm` | BookPage | FormField, Input, Select, Textarea, Checkbox, PaymentButton | React Hook Form, API mutations | Zod for validation |
| `PaymentButton` | RsvpForm | - | Local loading state, API mutations | Razorpay SDK |
| `Footer` | All pages | - | - | Google Maps |

## Component State and Props

### Navbar
- **State**: 
  - `isMenuOpen`: Controls mobile menu visibility
  - `isScrolled`: Controls navbar appearance on scroll
- **Props**: None
- **Functions**:
  - `toggleMenu()`: Toggles mobile menu
  - `scrollToTop()`: Scrolls to top of page on navigation

### Hero
- **State**: 
  - `currentSlide`: Controls current background image
- **Props**: None
- **Functions**:
  - Auto-changing background timer (useEffect)

### CountdownTimer
- **State**:
  - `timeLeft`: Tracks remaining time to event
- **Props**:
  - `targetDate`: Date string for the countdown target
- **Functions**:
  - Interval timer for countdown calculation

### RsvpForm
- **State**:
  - `isSubmitting`: Tracks form submission state
  - `razorpayLoaded`: Tracks payment SDK loading state
  - Form data via React Hook Form
- **Props**: None
- **Functions**:
  - `onSubmit()`: Handles form submission
  - `registerAndPayMutation`: API mutation for registration
  - `verifyPaymentMutation`: API mutation for payment verification
  - `initiatePayment()`: Launches Razorpay payment dialog

### PaymentButton
- **State**:
  - `isLoading`: Tracks payment processing state
- **Props**:
  - `attendeeId`: ID of attendee making payment
  - `name`, `email`, `phone`: Attendee details
  - `amount`: Payment amount
  - `description`: Payment description
  - `onSuccess`, `onFailure`: Callback functions
- **Functions**:
  - `handlePaymentClick()`: Initiates payment process
  - `createOrderMutation`: API mutation for creating payment order
  - `verifyPaymentMutation`: API mutation for verifying payment
  - `initiatePayment()`: Launches Razorpay payment dialog

## Styling Patterns

The project uses a consistent styling approach across components:

1. **Color Scheme**:
   - Primary: #1E3D59 (deep blue)
   - Accent: #F0C987 (gold)
   - White for backgrounds and text contrast

2. **Typography**:
   - Headings: 'Playfair Display' for elegance
   - Accent text: 'Great Vibes' for decorative elements
   - Body text: System font stack via Tailwind

3. **Layout Patterns**:
   - Container with max-width and padding for consistent content width
   - Responsive grid for multi-column layouts
   - Flexbox for alignment and spacing

4. **Animation**:
   - Subtle entrance animations via Framer Motion
   - Hover effects on interactive elements
   - Smooth transitions for state changes

5. **Component Structure**:
   - Section wrapper with padding
   - Header area with title and optional subtitle
   - Content area with appropriate layout
   - Responsive adjustments via Tailwind breakpoints