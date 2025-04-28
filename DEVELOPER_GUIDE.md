# Wedding Fraternity Developer Guide

## Getting Started

Welcome to the Wedding Fraternity project! This guide will help you set up your development environment and understand how to make changes to the codebase.

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v18+)
- npm (v8+)
- Git
- PostgreSQL (if working with a local database)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HexaGridSystems/bwf.git
   cd bwf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment setup:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:5000`.

## Project Architecture

The Wedding Fraternity project follows a modern web application architecture with a React frontend and Express.js backend.

### Key Technologies

- **React**: UI library for building user interfaces
- **TypeScript**: Static type checking for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library based on Radix UI
- **wouter**: Minimal router for React
- **React Query**: Data fetching and state management
- **Drizzle ORM**: ORM for database operations
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for data storage
- **Razorpay**: Payment gateway integration

### Code Organization

The codebase is organized into three main sections:

- `client/`: Frontend React code
- `server/`: Backend Express.js code
- `shared/`: Code shared between frontend and backend

#### Frontend Structure

- `client/src/components/`: Reusable UI components
- `client/src/pages/`: Page components for routing
- `client/src/lib/`: Utility functions, constants, and types
- `client/src/hooks/`: Custom React hooks

#### Backend Structure

- `server/routes.ts`: API route definitions
- `server/storage.ts`: Data access layer
- `server/index.ts`: Server entry point

#### Shared Structure

- `shared/schema.ts`: Database schema and type definitions

## Development Workflow

### Making Changes

1. **Create a new branch**: Always create a new branch for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Frontend changes**:
   - Add/modify components in `client/src/components/`
   - Add/modify pages in `client/src/pages/`
   - Update routing in `client/src/App.tsx` if needed

3. **Backend changes**:
   - Add/modify API endpoints in `server/routes.ts`
   - Update data access in `server/storage.ts`
   - Update database schema in `shared/schema.ts` when needed

4. **Test your changes**: Make sure your changes work as expected
   - Verify UI changes in the browser
   - Test API endpoints using tools like Postman or cURL

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

6. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request**: Open a PR for your changes to be reviewed

### Best Practices

1. **Code Style**:
   - Follow consistent formatting (the project uses ESLint and Prettier)
   - Use meaningful variable and function names
   - Add comments for complex logic

2. **Component Development**:
   - Create reusable components
   - Use TypeScript types for props
   - Follow the existing component structure

3. **API Development**:
   - Validate inputs using Zod schemas
   - Return consistent response formats
   - Handle errors gracefully

4. **State Management**:
   - Use React Query for API data
   - Use React Context for global state
   - Use local state for component-specific state

## Adding New Features

### Adding a New Page

1. Create a new page component in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Import and use necessary components

### Adding a New API Endpoint

1. Define the endpoint in `server/routes.ts`
2. Implement the handler function
3. Add any necessary data access methods in `server/storage.ts`
4. Update types in `shared/schema.ts` if needed

### Adding a New Component

1. Create the component in `client/src/components/`
2. Define props interface with TypeScript
3. Use Tailwind CSS for styling
4. Import and use the component where needed

## Working with the Database

The project uses Drizzle ORM with PostgreSQL for database operations.

### Schema Changes

1. Update the schema in `shared/schema.ts`
2. Create a migration if needed
3. Update the storage interface in `server/storage.ts`

### Common Database Operations

```typescript
// Fetching data
const attendees = await db.select().from(attendees);

// Filtering data
const attendee = await db
  .select()
  .from(attendees)
  .where(eq(attendees.id, id));

// Creating data
const newAttendee = await db
  .insert(attendees)
  .values(attendeeData)
  .returning();

// Updating data
const updatedAttendee = await db
  .update(attendees)
  .set({ isPaid: true })
  .where(eq(attendees.id, id))
  .returning();
```

## Payment Integration

The project uses Razorpay for payment processing. Here's how the payment flow works:

1. User fills out the registration form
2. On form submission, the attendee data is sent to the backend
3. The backend creates a Razorpay order and returns the order ID
4. The frontend opens the Razorpay payment dialog
5. Upon successful payment, the payment details are sent to the backend for verification
6. The backend verifies the payment and updates the attendee's payment status

### Testing Payments

For testing payments, use Razorpay's test mode credentials and the following test card:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3-digit number
- Name: Any name

## Troubleshooting

### Common Issues

1. **Database connection errors**:
   - Verify your DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Check for firewall issues

2. **API errors**:
   - Check the server logs for error messages
   - Verify the request format matches the expected format
   - Check for missing or invalid parameters

3. **Build errors**:
   - Make sure all dependencies are installed
   - Check for TypeScript errors
   - Verify import paths are correct

### Getting Help

If you're stuck, reach out to the team:

- Create an issue on GitHub
- Contact the project maintainers
- Check the existing documentation

## Deployment

The project is deployed on Vercel with automatic deployments from the main branch.

### Deployment Process

1. Changes are pushed to the main branch
2. Vercel automatically builds and deploys the application
3. The application is available at the deployment URL

### Environment Variables

Make sure the following environment variables are set in the deployment environment:

- `DATABASE_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Razorpay Documentation](https://razorpay.com/docs/)