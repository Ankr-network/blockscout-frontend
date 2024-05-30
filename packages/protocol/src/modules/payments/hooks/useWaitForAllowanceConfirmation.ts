import { useCallback } from 'react';

import { ICryptoTransaction } from '../types';
import { useWaitForAllowanceConfirmationMutation } from '../actions/waitForAllowanceConfirmation';

export interface IUseWaitForAllowanceConfirmationProps {
  tx: ICryptoTransaction;
}

export const useWaitForAllowanceConfirmation = ({
  tx,
}: IUseWaitForAllowanceConfirmationProps) => {
  const { id: txId, isAllowanceConfirming } = tx;

  const [waitForAllowanceConfirmation] =
    useWaitForAllowanceConfirmationMutation();

  const handleWaitForAllowanceConfirmation = useCallback(
    () => waitForAllowanceConfirmation({ txId }),
    [txId, waitForAllowanceConfirmation],
  );

  return { handleWaitForAllowanceConfirmation, isAllowanceConfirming };
};
