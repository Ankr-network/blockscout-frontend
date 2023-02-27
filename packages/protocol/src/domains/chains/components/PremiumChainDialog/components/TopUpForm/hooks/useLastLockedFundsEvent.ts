import { useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyTopUpGetLastLockedFundsEventQuery } from 'domains/account/actions/topUp/getLastLockedFundsEvent';

export const useLastLockedFundsEvent = () => {
  const [getLastLockedFundsEvent, { data: lastLockedFundsEvent, isLoading }] =
    useLazyTopUpGetLastLockedFundsEventQuery();

  const { isWalletConnected } = useAuth();

  useEffect(() => {
    if (isWalletConnected) {
      getLastLockedFundsEvent();
    }
  }, [getLastLockedFundsEvent, isWalletConnected]);

  return { isLoading, lastLockedFundsEvent };
};
