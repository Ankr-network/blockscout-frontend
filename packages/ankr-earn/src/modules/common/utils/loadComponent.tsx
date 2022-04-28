import loadable, {
  DefaultComponent,
  LoadableComponent,
} from '@loadable/component';

import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

export interface IRetryOptions {
  retries: number;
  interval: number;
}

const MAX_ATTEMPTS = 3;

const INTERVAL = 1_000;

export function loadComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadFn: () => Promise<DefaultComponent<any>>,
  options?: IRetryOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): LoadableComponent<any> {
  return loadable(
    () =>
      retry(loadFn, options ?? { retries: MAX_ATTEMPTS, interval: INTERVAL }),
    { fallback: <QueryLoadingAbsolute /> },
  );
}

async function retry<R>(
  fn: () => Promise<R>,
  options: IRetryOptions,
): Promise<R> {
  const { retries, interval } = options;

  return new Promise<R>((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: Error) => {
        setTimeout(() => {
          if (retries === 1) {
            return reject(error);
          }

          const newOptions = { retries: retries - 1, interval };
          return retry(fn, newOptions).then(resolve, reject);
        }, interval);
      });
  });
}
