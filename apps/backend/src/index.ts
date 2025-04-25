import express from 'express';
import cors from 'cors';

// Import routes
import { helloRoutes } from './routes/hello.js';

// Create Express instance
export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Apply routes
helloRoutes(app);

// Define port
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
const HOST = process.env.HOST || '0.0.0.0';

// Start server if not in development mode (Vite handles development)
if (import.meta.env?.PROD) {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}