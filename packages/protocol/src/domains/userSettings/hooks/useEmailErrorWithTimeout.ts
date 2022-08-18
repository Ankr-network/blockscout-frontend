import { useCallback, useMemo, useState } from 'react';

import { IEmailResponse } from 'multirpc-sdk';
import { getEmailErrorMessage } from '../utils/getEmailErrorMessage';
import { useTimeoutBlocker } from './useTimeoutBlocker';

export const useEmailErrorWithTimeout = (
  error: any,
  onEvent: (...args: any) => void,
) => {
  const [clicked, setClicked] = useState(false);

  const eventHandler = useCallback(
    (...args: any) => {
      onEvent(args);
      setClicked(true);
    },
    [onEvent],
  );

  const errorTimeout = (error?.response?.data?.error as IEmailResponse['error'])
    ?.params?.resendableInMs;

  const isBlocked = useTimeoutBlocker(errorTimeout);

  const errorMessage = useMemo(
    () => (isBlocked && clicked ? getEmailErrorMessage({ error }) : undefined),
    [clicked, error, isBlocked],
  );

  return {
    errorMessage,
    isBlocked,
    eventHandler,
  };
};
