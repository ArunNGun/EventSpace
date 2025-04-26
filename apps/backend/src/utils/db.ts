import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle connection errors
prisma.$on('error', (e:any) => {
  console.error('Prisma Client error:', e);
});

// Export the prisma client instance
export default prisma;

// Helper function to test the database connection
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database connections...');
  await prisma.$disconnect();
  console.log('Database connections closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing database connections...');
  await prisma.$disconnect();
  console.log('Database connections closed');
  process.exit(0);
});