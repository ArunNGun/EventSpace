import { Request, Response } from 'express';
import prisma from '../utils/db.js';

// Define the context type
export interface GraphQLContext {
  prisma: typeof prisma;
  req: Request;
  res: Response;
  // Will add authentication-related fields here in the future
  // user?: User;
}

// Context factory function
export async function createContext({ req, res }: { req: Request; res: Response }): Promise<GraphQLContext> {
  // Here we can add authentication logic in the future
  // For example, extract and verify JWT token from headers
  // const token = req.headers.authorization?.split(' ')[1];
  // const user = token ? await verifyToken(token) : undefined;

  return {
    prisma,
    req,
    res,
    // user,
  };
}