import AppError from '@shared/error/AppError';
import { Request, Response, NextFunction } from 'express';

export function resolveError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  //Tratando errors que ocorream na aplicação
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // errors que não foram tratados ou que não estava sendo esperado
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
