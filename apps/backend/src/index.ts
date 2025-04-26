import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Import database connection
import { testConnection } from './utils/db.js';

// Import GraphQL schema, resolvers, and context
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { createContext, GraphQLContext } from './graphql/context.js';

// Create Express instance
export const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Create and start Apollo Server
async function startApolloServer() {
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    formatError: (error) => {
      return error;
    },
  });

  await server.start();

  // Apply GraphQL middleware to Express at the /graphql endpoint
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: createContext,
    })
  );

  console.log('🚀 GraphQL server ready at /graphql');
}

// Define port
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
const HOST = process.env.HOST || '0.0.0.0';

// Start server if not in development mode (Vite handles development)
if (import.meta.env?.PROD) {
  // Test database connection before starting server
  testConnection().then(async (connected) => {
    if (connected) {
      // Start Apollo Server
      await startApolloServer();
      
      // Start Express server
      app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
      });
    } else {
      console.error('Failed to start server due to database connection issues');
      process.exit(1);
    }
  });
} else {
  // In development mode, just test the connection but don't exit on failure
  testConnection().then(async (connected) => {
    // Start Apollo Server even if database connection failed
    await startApolloServer();
    
    if (!connected) {
      console.warn('⚠️ Development server running but database connection failed');
    }
  });
}