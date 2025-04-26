import express from 'express';
import cors from 'cors';

// Import routes
import { helloRoutes } from './routes/hello.js';
import { healthRoutes } from './routes/health.js';

// Import database connection
import { testConnection } from './utils/db.js';

// Create Express instance
export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Apply routes
helloRoutes(app);
healthRoutes(app);

// Define port
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
const HOST = process.env.HOST || '0.0.0.0';

// Start server if not in development mode (Vite handles development)
if (import.meta.env?.PROD) {
  // Test database connection before starting server
  testConnection().then((connected) => {
    if (connected) {
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
  testConnection().then((connected) => {
    if (!connected) {
      console.warn('⚠️ Development server running but database connection failed');
    }
  });
}