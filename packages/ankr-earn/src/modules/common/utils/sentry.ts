import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { isMainnet } from 'modules/common/const';

export const initSentry = (): void => {
  if (isMainnet) {
    Sentry.init({
      dsn: 'https://a7c65832d0d144f29faf5f1063501a6a@o286716.ingest.sentry.io/4504644926242816',
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};
