import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';
import AppError from '../errors/AppError';

const { secret } = auth.jwt;

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('JTW token is missing', 401);
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
