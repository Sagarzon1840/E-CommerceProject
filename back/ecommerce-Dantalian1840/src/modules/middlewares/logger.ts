import { NextFunction, Request, Response } from 'express';

export function LoggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const time = new Date();
  console.log(`Method ${req.method} in route ${req.url} on ${time}`);

  next();
}
