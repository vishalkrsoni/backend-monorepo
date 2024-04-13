import express from 'express';
import { User, logger, scheduleCronJob } from '@backend-monorepo/common';
const app = express();
const PORT = process.env.PORT || 8084;

const cronTask = async () => {
  console.info('executing cron job at ', new Date(Date.now()));
};

const cronJobEvery2Seconds = scheduleCronJob('*/3 * * * * *', cronTask);
setTimeout(() => {
  cronJobEvery2Seconds.stop();
  logger.info('Cron job stopped successfully');
}, 12001);
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to scheduler!' });
});

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
server.on('error', console.error);
