import { logger } from '../store';

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function generateNewError(
  status: number,
  message: string,
  error?: any
): Error {
  const err = new Error(message);
  (err as any).status = status;
  (err as any).error = error;
  logger.error(err);
  return err;
}
