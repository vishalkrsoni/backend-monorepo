import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import express, { Express, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  logger,
  checkNetworkConnection,
  mongoConnect,
} from '@backend-monorepo/common';
import { adminRoutes } from './routers';

const { ADMIN_PORT, DB_NAME, MONGO_URL, SENTRY_DSN } = process.env;

const app: Express = express();

checkNetworkConnection();
mongoConnect(DB_NAME, MONGO_URL);

// sentry initialization from here
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cookieParser()).use(express.json()).use(cors()).use(adminRoutes);

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err: Error, req, res, next: NextFunction) {
  console.log(req);
  res.statusCode = 500;
  next(err);
  res.end(res.sentry + '\n');
});

app
  .listen(ADMIN_PORT, () => {
    logger.info(`Admin-service started successfully`);
    logger.debug(`Base_URL : http://localhost:${ADMIN_PORT}`);
  })
  .on('error', logger.error);
