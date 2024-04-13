import { lookup } from 'dns';
import { logger } from '../store';

type NetworkCheckResult = {
  error?: Error;
  isConnected: boolean;
  data: any;
};

function isNetworkConnected(
  callback: (result: NetworkCheckResult) => void
): void {
  lookup('google.com', (err: Error | null, address: string, family: number) => {
    if (err) {
      callback({ error: err, isConnected: false, data: null });
    } else {
      callback({ error: null, isConnected: true, data: { address, family } });
    }
  });
}

export const checkNetworkConnection = async () => {
  try {
    const networkResult: NetworkCheckResult = await new Promise(
      (resolve, reject) => {
        isNetworkConnected((result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });
      }
    );

    if (networkResult.isConnected) {
      logger.info(
        `Internet connection check passed ${networkResult.data.address} : `
      );
    } else {
      logger.warn('Network connection unavailable.');
      // TODO : Handle network unavailable scenario (e.g., retry, log)
    }
  } catch (error) {
    logger.error('Error during network check or connection:', error.message);
    throw new error('network error', error);
    // TODO : Handle errors here (e.g., exit process, log and retry)
  }
};
