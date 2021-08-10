import { Request, Response, NextFunction } from 'express';
import { RateLimiterPostgres } from 'rate-limiter-flexible';
import { Pool } from 'pg';
import AppError from '@shared/error/AppError';

const client = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'singer',
  user: 'postgres',
  password: 'postgres',
});

const limiter = new RateLimiterPostgres({
  storeClient: client,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 5,
});

export default async function rateLimite(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch {
    throw new AppError('Too many requests', 429);
  }
}
