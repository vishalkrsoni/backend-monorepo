import { APIResponse, logger } from '@backend-monorepo/common';
import { Request, Response, NextFunction } from 'express';
import { rateLimit, RateLimitExceededEventHandler } from 'express-rate-limit';

// Configuration Constants
const MAX_LOGIN_ATTEMPTS = 5;
const WINDOW_DURATION_MS = 60 * 1000;
const MESSAGE_TEMPLATE = `Too many login attempts from this IP. Please try again after 60 seconds.`;




/**
 * Handler for rate limit exceeded events by logging the error and responding with a message.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @param {{ message: APIResponse }} options - The options object containing the error message.
 * @returns {void}
 */
const rateLimitHandler: RateLimitExceededEventHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  { message }: { message: APIResponse },
) => {
  const { url } = req;

  logger.error(`Login attempt limit exceeded for ${url}: ${message.message}`);
  logger.debug('Rate limiter callback params:', { req, res, next });

  return res.status(message.statusCode).send(message);
};

const rateLimitOptions = {
  max: MAX_LOGIN_ATTEMPTS,
  windowMs: WINDOW_DURATION_MS,
  message: APIResponse.tooManyRequests(MESSAGE_TEMPLATE),
  standardHeaders: true,
  skipFailedRequests: true,
  skipSuccessfulRequests: true,
};

/**
 * Express middleware for rate limiting login attempts.
 * @type {Middleware}
 * @name loginLimiter
 * @memberof module:Middleware
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {void}
 */
export const loginLimiter = rateLimit({
  ...rateLimitOptions,
  handler: rateLimitHandler,
});
