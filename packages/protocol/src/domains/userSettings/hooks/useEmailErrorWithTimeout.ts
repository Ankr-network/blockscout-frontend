import { useCallback, useMemo, useState } from 'react';

import { getResendEmailErrorMessage } from '../utils/getResendEmailErrorMessage';
import { useTimeoutBlocker } from './useTimeoutBlocker';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

export const useEmailErrorWithTimeout = (
  error: any,
  onEvent: (...args: any) => void,
  email?: string,
) => {
  const [clicked, setClicked] = useState(false);

  const eventHandler = useCallback(
    (...args: any) => {
      onEvent(args);
      setClicked(true);
    },
    [onEvent],
  );

  const isBlocked = useTimeoutBlocker(MINUTE, !!error);

  const errorMessage = useMemo(
    () =>
      isBlocked && clicked
        ? getResendEmailErrorMessage(error, email)
        : undefined,
    [clicked, email, error, isBlocked],
  );

  return {
    errorMessage,
    isBlocked,
    eventHandler,
  };
};
