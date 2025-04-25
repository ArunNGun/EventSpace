import { Express, Request, Response } from 'express';

export function helloRoutes(app: Express) {
  // GET /api/hello
  app.get('/api/hello', (req: Request, res: Response) => {
    res.json({
      message: 'Hello from Express with Vite!',
      timestamp: new Date().toISOString()
    });
  });
}