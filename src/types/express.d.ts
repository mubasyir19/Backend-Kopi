import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
