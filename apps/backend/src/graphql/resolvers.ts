import prisma from '../utils/db.js';

export const resolvers = {
  Query: {
    // Health check resolver
    health: async () => {
      try {
        // Check database connection
        await prisma.$queryRaw`SELECT 1`;
        
        return {
          status: 'ok',
          timestamp: new Date().toISOString(),
          database: {
            connected: true,
            message: 'Database connection is healthy'
          },
          api: {
            status: 'ok',
            message: 'API is running'
          }
        };
      } catch (error) {
        console.error('GraphQL health check failed:', error);
        
        return {
          status: 'error',
          timestamp: new Date().toISOString(),
          database: {
            connected: false,
            message: 'Database connection failed'
          },
          api: {
            status: 'ok',
            message: 'API is running but database connection failed'
          }
        };
      }
    }
  }
};