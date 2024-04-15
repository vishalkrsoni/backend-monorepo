import { logger } from '@backend-monorepo/common';
import { rateLimit } from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5, // for each IP allowing 5_requests per_window per_minute
  message: {
    message: `Too many attempt from this IP, Please try again after 60 seconds`,
    status: `error`,
    statusCode: 400,
  },
  handler: (req, res, next, options) => {
    logger.error(
      `Too many attempts: ${options.message.message}\t ${req.method}\t ${req.url}
      \t ${req.originalUrl}`,
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
