import { createContext } from 'react';

import { UseLoggerResult } from './components/Logger/hooks/useLogger';
import { root as parentRoot } from '../../const';

export const root = `${parentRoot}.request-composer`;

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
