import { createContext } from 'react';

import { emptyFn } from 'modules/common/utils/emptyFn';
import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

import { UseLoggerResult } from '../Logger/hooks/useLogger';

type CountdownContextValue = ReturnType<typeof useRequestCountdown>;

export const CountdownContext = createContext<CountdownContextValue>({
  isRun: false,
  seconds: 0,
  start: emptyFn,
});

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
