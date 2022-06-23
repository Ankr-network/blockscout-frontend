import { t } from 'modules/i18n/utils/intl';

const DEFAULT_MAX_ATTEMPTS = 10;
const ETH_BLOCK_TIME = 10 * 1000;

export const retry = async <T>(
  action: () => Promise<T | any>,
  skipCondition: (e: any) => boolean,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  interval = ETH_BLOCK_TIME,
  errorMessage?: (e: Error) => string,
): Promise<T> => {
  // eslint-disable-next-line no-async-promise-executor
  const result = await new Promise(async (resolve, reject) => {
    let attempts = 0;

    // eslint-disable-next-line consistent-return
    const i = setInterval(async () => {
      try {
        const value = await action();
        clearInterval(i);
        return resolve(value);
      } catch (e: any) {
        if (e.message === t('error.failed')) {
          clearInterval(i);
          reject(errorMessage || e);
        }

        if (!e.response?.data || !skipCondition(e.response.data)) {
          if (attempts < maxAttempts) {
            attempts++;
          } else {
            clearInterval(i);
            reject(errorMessage || e);
          }
        }
      }
    }, interval);
  });

  return result as T;
};
