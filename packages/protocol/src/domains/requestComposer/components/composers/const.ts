import { createContext } from 'react';

import { UseLoggerResult } from '../Logger/hooks/useLogger';

export const root = `request-composer`;

const emptyFn = () => {};

export const LoggerContext = createContext<UseLoggerResult>({
  clear: emptyFn,
  log: emptyFn,
  logError: emptyFn,
  logInit: emptyFn,
  logRequest: emptyFn,
  logResponse: emptyFn,
  logResponseTime: emptyFn,
  logs: [],
});
