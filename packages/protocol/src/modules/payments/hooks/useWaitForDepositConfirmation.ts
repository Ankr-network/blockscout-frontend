import { useCallback } from 'react';

import { ICryptoTransaction } from '../types';
import { useWaitForDepositConfirmationMutation } from '../actions/waitForDepositConfirmation';

export interface IUseWaitForDepositConfirmationProps {
  tx: ICryptoTransaction;
}

export const useWaitForDepositConfirmation = ({
  tx,
}: IUseWaitForDepositConfirmationProps) => {
  const { id: txId, isDepositConfirming } = tx;

  const [
    waitForDepositConfirmation,
    { reset: handleResetDepositConfirmation, isUninitialized },
  ] = useWaitForDepositConfirmationMutation({ fixedCacheKey: txId });

  const handleWaitForDepositConfirmation = useCallback(
    () => waitForDepositConfirmation({ txId }),
    [txId, waitForDepositConfirmation],
  );

  return {
    handleResetDepositConfirmation,
    handleWaitForDepositConfirmation,
    isDepositConfirming,
    isUninitialized,
  };
};
