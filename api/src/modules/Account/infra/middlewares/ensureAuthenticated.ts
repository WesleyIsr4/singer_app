import AppError from '@shared/error/AppError';
import authConfig from '@config/auth';
import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  iat: number;
  ext: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as IPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('Invalid JWT token!', 401);
  }
}
