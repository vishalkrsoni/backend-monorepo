import { logger } from '@backend-monorepo/common';

export const handleUserRegistration = (userData: string) => {
  const data = JSON.parse(userData);
  // TODO : create methods based on the registered user  (e.g., send welcome email, update analytics)
  logger.info(`User Create event received for : ${data.user.name}`);
};
