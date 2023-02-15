import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { checkAmountAndSetTokenIssuanceStep } from '../utils/checkAmountAndSetTokenIssuanceStep';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLastLockedFundsEvent } from './useLastLockedFundsEvent';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export const useCheckLoginStep = () => {
  const { handleSetAmount } = useTopUp();
  const { isLoading, lastLockedFundsEvent } = useLastLockedFundsEvent();
  const { isWalletConnected, isTokenExpired, workerTokenData } = useAuth();

  const dispatch = useDispatch();

  const [hasLoginStep, setHasLoginStep] = useState(false);

  useEffect(() => {
    if (isWalletConnected && lastLockedFundsEvent) {
      checkAmountAndSetTokenIssuanceStep({
        handleTokenExpiration: () => dispatch(oauthSignout.initiate()),
        handleTokenIssue: amount => {
          setHasLoginStep(true);
          handleSetAmount(amount);
        },
        isTokenExpired,
        lastLockedFundsEvent,
      });
    }
  }, [
    dispatch,
    handleSetAmount,
    hasLoginStep,
    isTokenExpired,
    isWalletConnected,
    lastLockedFundsEvent,
    workerTokenData,
  ]);

  return { hasLoginStep, isLoading };
};
