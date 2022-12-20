import { useEffect } from 'react';

import { UseLoggerResult } from '../components/Logger/hooks/useLogger';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface ComposerRequest<S, T> {
  error: unknown;
  method?: [S];
  response?: [T];
  time: number;
  withResponse: boolean;
}

export interface RequestComposerLogsParams<S extends string, T>
  extends UseLoggerResult {
  request: ComposerRequest<S, T>;
}

export interface RequestComposerLogsResult {
  clear: UseLoggerResult['clear'];
  logs: UseLoggerResult['logs'];
}

export function useRequestComposerLogs<S extends string, T>({
  logInit,
  logResponse,
  logResponseTime,
  logError,
  logRequest,
  clear,
  logs,
  request,
}: RequestComposerLogsParams<S, T>): RequestComposerLogsResult {
  const { error, method, response, time, withResponse } = request;

  useOnMount(() => {
    logInit();
  });

  useEffect(() => {
    if (withResponse) {
      logResponse(response?.[0]);
      logResponseTime(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, logResponse]);

  useEffect(() => {
    if (error) {
      logError(error);
      logResponseTime(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, logError]);

  useEffect(() => {
    if (method) {
      logRequest(method[0]);
    }
  }, [logRequest, method]);

  return { clear, logs };
}
