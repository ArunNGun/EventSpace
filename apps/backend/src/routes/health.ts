import { Express, Request, Response } from 'express';
import prisma from '../utils/db.js';

export function healthRoutes(app: Express) {
  /**
   * @route GET /api/health
   * @desc Check API and database health
   * @access Public
   */
  app.get('/api/health', async (req: Request, res: Response) => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;
      
      return res.status(200).json({
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
      });
    } catch (error) {
      console.error('Health check failed:', error);
      
      return res.status(500).json({
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
      });
    }
  });
}