import { useMemo } from 'react';

import { IEmailResponse } from 'multirpc-sdk';
import { getEmailErrorMessage } from '../utils/getEmailErrorMessage';
import { useTimeoutBlocker } from './useTimeoutBlocker';

export const useEmailErrorWithTimeout = (error: any) => {
  const errorTimeout = (error?.response?.data?.error as IEmailResponse['error'])
    ?.params?.resendableInMs;

  const isBlocked = useTimeoutBlocker(errorTimeout);

  const errorMessage = useMemo(
    () => (isBlocked ? getEmailErrorMessage({ error }) : undefined),
    [error, isBlocked],
  );

  return {
    errorMessage,
    isBlocked,
  };
};
