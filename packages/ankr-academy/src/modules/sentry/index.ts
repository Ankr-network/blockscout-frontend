import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { isProd } from 'modules/common/utils/isProd';

const { REACT_APP_SENTRY_DSN, REACT_APP_NAME, REACT_APP_VERSION } = process.env;

export const initializeSentry = () => {
  const DEBUG = !isProd();

  if (REACT_APP_SENTRY_DSN) {
    Sentry.init({
      debug: DEBUG,
      dsn: REACT_APP_SENTRY_DSN,
      environment: window?.location?.host,
      integrations: [new Integrations.BrowserTracing()],
      release: `${REACT_APP_NAME}-${REACT_APP_VERSION}`,

      beforeSend(event) {
        if (DEBUG) {
          // eslint-disable-next-line no-console
          console.error(event.message, event);
          return null;
        }

        return event;
      },
    });
  }
};
