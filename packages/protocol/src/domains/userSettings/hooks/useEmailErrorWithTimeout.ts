import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { IEmailResponse } from 'multirpc-sdk';
import { getEmailErrorMessage } from '../utils/getEmailErrorMessage';
import { useIsDisabledWithTimeout } from './useIsDisabledWithTimeout';

interface IUseEmailErrorWithTimeoutProps {
  type: string;
  requestKey?: string;
}

export const useEmailErrorWithTimeout = ({
  type,
  requestKey,
}: IUseEmailErrorWithTimeoutProps) => {
  const { error } = useQuery<IEmailResponse | null>({
    type,
    requestKey,
  });

  const errorTimeout = (error?.response?.data?.error as IEmailResponse['error'])
    ?.params?.resendableInMs;

  const isDisabled = useIsDisabledWithTimeout(errorTimeout);

  const errorMessage = useMemo(
    () => (isDisabled ? getEmailErrorMessage({ error }) : undefined),
    [error, isDisabled],
  );

  return {
    errorMessage,
    isDisabled,
  };
};
