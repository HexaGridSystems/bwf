# Wedding Fraternity Website

## Overview

A dynamic web platform for the Wedding Fraternity Meet-up 3.0, providing a streamlined networking and registration experience for wedding industry professionals. The event will be held at PRINCESS SHRINE in Bengaluru on July 15, 2025.

![Wedding Fraternity](https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## Features

- Responsive, mobile-first design
- Event information and countdown timer
- Speaker profiles and event schedule
- Integrated registration and payment system
- Venue details with Google Maps integration
- FAQ section and contact information

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Gateway**: Razorpay
- **Deployment**: Vercel

## Documentation

For detailed information about the project, please refer to the following documentation:

- [Project Documentation](./DOCUMENTATION.md) - Comprehensive overview of the project
- [Component Diagram](./COMPONENT_DIAGRAM.md) - Visual representation of component relationships
- [API Documentation](./API_DOCUMENTATION.md) - Detailed API endpoint descriptions
- [Developer Guide](./DEVELOPER_GUIDE.md) - Guide for developers contributing to the project

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v8+)
- PostgreSQL (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HexaGridSystems/bwf.git
   cd bwf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client              # Frontend React application
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── hooks       # Custom React hooks
│   │   ├── lib         # Utilities, constants, types
│   │   ├── pages       # Page components for routing
│   │   ├── App.tsx     # Main app component and routing
│   │   └── main.tsx    # Entry point
├── server              # Backend Express.js application
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data storage layer
│   └── index.ts        # Server entry point
└── shared              # Shared code between frontend and backend
    └── schema.ts       # Database schema definitions
```

## Deployment

The application is configured to be deployed on Vercel, with automatic deployments triggered by commits to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Razorpay](https://razorpay.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Unsplash](https://unsplash.com/) for images