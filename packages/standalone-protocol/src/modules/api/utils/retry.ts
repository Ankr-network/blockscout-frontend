const DEFAULT_MAX_ATTEMPTS = 10;
const DEFAULT_ATTEMPT_INTERVAL = 10 * 1000;

export const retry = async <T>(
  action: () => Promise<T | any>,
  skipCondition: (e: any) => boolean,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  interval = DEFAULT_ATTEMPT_INTERVAL,
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
