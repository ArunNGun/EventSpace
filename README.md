# EventSpace

EventSpace is a smart event management and discovery platform that combines features of Ticketmaster, Meetup, and Airbnb Experiences. Users can discover, host, and book events (both online and offline) with support for limited seats, pricing tiers, reviews, personalized recommendations, and real-time notifications.

## Authors

- **ArunNGun**

## Project Structure

This project is set up as a Turborepo monorepo with the following structure:

```
EventSpace/
├── apps/
│   ├── backend/         # Express server with Vite
│   └── frontend/        # Next.js application
└── packages/            # Shared packages
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To run the development servers for both frontend and backend:

```bash
npm run dev
```

This will start:
- The Express backend server with Vite at http://localhost:3002
- The Next.js frontend application at http://localhost:3000

### Building

To build all applications:

```bash
npm run build
```

## Technology Stack

- **Frontend**: Next.js (App Router) with React
- **Backend**: Node.js with Express
- **Development Tools**: Vite for backend, Turborepo for monorepo management
- **Future Enhancements**:
  - Database: PostgreSQL with Prisma ORM
  - API Layer: GraphQL with Apollo or yoga maybe
  - Authentication: NextAuth.js or similar
  - Payment Processing: Stripe/PayPal
  - Real-time Features: WebSockets