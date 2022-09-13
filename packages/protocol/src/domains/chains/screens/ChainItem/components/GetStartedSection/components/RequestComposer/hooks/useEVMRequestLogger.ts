import { useEffect } from 'react';

import { useEVMRequest } from './useEVMRequest';
import { useLogger } from './useLogger';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useEVMRequestLogger = () => {
  const {
    clear,
    logError,
    logInit,
    logRequest,
    logResponse,
    logResponseTime,
    logs,
  } = useLogger();

  const { error, method, response, time, withResponse } = useEVMRequest();

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
    if (method?.[0]) {
      logRequest(method[0]);
    }
  }, [logRequest, method]);

  return { clear, logs };
};
