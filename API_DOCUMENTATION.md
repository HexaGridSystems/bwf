# Wedding Fraternity API Documentation

## Overview

The Wedding Fraternity website API provides endpoints for attendee registration, contact message submission, newsletter subscription, and Razorpay payment integration.

## Base URL

All API routes are relative to the base URL of the deployed application.

## Authentication

The API does not currently implement authentication as it's designed for public access. However, server-side validation is performed on all requests.

## Endpoints

### Attendee Registration

#### Register an Attendee

```
POST /api/register
```

Creates a new attendee registration record in the database.

**Request Body:**

```json
{
  "name": "String (required)",
  "company": "String (required)",
  "email": "String (required, valid email format)",
  "phone": "String (required, valid phone format)",
  "role": "String (required)",
  "expectations": "String (optional)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "Number",
    "name": "String",
    "company": "String",
    "email": "String",
    "phone": "String",
    "role": "String",
    "expectations": "String | null",
    "registeredAt": "Date",
    "isPaid": false
  },
  "message": "Registration successful!"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

### Payment Integration

#### Create Payment Order

```
POST /api/payment/create-order
```

Creates a new payment order through Razorpay.

**Request Body:**

```json
{
  "amount": "Number (required, in INR)",
  "currency": "String (required, usually 'INR')",
  "receipt": "String (required, unique identifier)",
  "notes": {
    "attendeeId": "Number (required)",
    "name": "String (optional)",
    "email": "String (optional)",
    "phone": "String (optional)",
    "description": "String (optional)"
  }
}
```

**Response:**

```json
{
  "success": true,
  "order": {
    "id": "String (Razorpay order ID)",
    "amount": "Number",
    "currency": "String",
    "receipt": "String",
    "status": "String",
    "created_at": "Number (timestamp)"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

#### Verify Payment

```
POST /api/payment/verify
```

Verifies a completed payment through Razorpay and updates the attendee's payment status.

**Request Body:**

```json
{
  "orderId": "String (required, Razorpay order ID)",
  "paymentId": "String (required, Razorpay payment ID)",
  "signature": "String (required, Razorpay signature)",
  "attendeeId": "Number (required)"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully!"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

### Contact Messages

#### Submit Contact Message

```
POST /api/contact
```

Submits a contact message from the website contact form.

**Request Body:**

```json
{
  "name": "String (required)",
  "email": "String (required, valid email format)",
  "message": "String (required)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "Number",
    "name": "String",
    "email": "String",
    "message": "String",
    "sentAt": "Date"
  },
  "message": "Contact message sent successfully!"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

### Newsletter Subscription

#### Subscribe to Newsletter

```
POST /api/subscribe
```

Adds a new subscriber to the newsletter list.

**Request Body:**

```json
{
  "email": "String (required, valid email format)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "Number",
    "email": "String",
    "subscribedAt": "Date"
  },
  "message": "Subscribed successfully!"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

## Error Handling

All API endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Common error scenarios:

- **400 Bad Request**: Invalid or missing required fields
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists (e.g., email already registered)
- **500 Internal Server Error**: Server-side processing error

## Data Validation

Input data is validated using Zod schemas defined in `shared/schema.ts`. The validation ensures:

- Required fields are present
- Email addresses are in valid format
- String fields meet minimum length requirements
- Data types match expected formats

## Implementation Details

### Server-Side Architecture

The API is implemented using Express.js with the following structure:

1. **Routing**: API routes are defined in `server/routes.ts`
2. **Storage**: Data access is managed through `server/storage.ts`
3. **Schema**: Data models are defined in `shared/schema.ts`

### Database Integration

The API interacts with a PostgreSQL database using Drizzle ORM, with:

- Type-safe database operations
- Automatic query building
- Schema validation through Zod integration

### Payment Processing

Payment integration with Razorpay follows this flow:

1. Create order with Razorpay API
2. Return order details to client
3. Client completes payment through Razorpay SDK
4. Verify payment signature server-side
5. Update attendee payment status

## Rate Limiting and Security

The API implements basic security measures:

- Input validation to prevent injection attacks
- CORS configuration to control allowed origins
- HTTP-only cookies for any session data
- Payload size limiting to prevent abuse

## Development Usage

When developing against this API:

1. Ensure all required fields are included in requests
2. Handle error responses appropriately
3. Test with a Razorpay test account for payment flows
4. Validate email submissions before sending to prevent validation errors