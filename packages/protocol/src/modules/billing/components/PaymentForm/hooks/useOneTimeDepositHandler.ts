import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { hasResponseError } from 'modules/common/utils/hasResponseError';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useOneTimeDialogState } from './useOneTimeDialogState';

type TPropsToExtend = Pick<
  ReturnType<typeof useOneTimeDialogState>,
  'setCurrentDepositStatus'
>;

export interface IUseOneTimeDepositHandler extends TPropsToExtend {
  onCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
}

export const useOneTimeDepositHandler = ({
  onCryptoPaymentDepositDialogClose,
  onDepositSuccess,
  setCurrentDepositStatus,
}: IUseOneTimeDepositHandler) => {
  const { handleDeposit, handleResetDeposit, handleWaitTransactionConfirming } =
    useTopUp();

  const onDeposit = useCallback(async () => {
    handleResetDeposit();

    setCurrentDepositStatus(ECryptoDepositStepStatus.Confirmation);
    const depositResponse = await handleDeposit();

    setCurrentDepositStatus(ECryptoDepositStepStatus.Pending);

    const confirmationResponse = await handleWaitTransactionConfirming();

    try {
      const hasDepositError =
        hasResponseError(depositResponse) ||
        hasResponseError(confirmationResponse);

      if (hasDepositError) {
        setCurrentDepositStatus(ECryptoDepositStepStatus.Error);
      } else {
        setCurrentDepositStatus(ECryptoDepositStepStatus.Complete);
        onCryptoPaymentDepositDialogClose();
        onDepositSuccess();
      }
    } catch (error) {
      setCurrentDepositStatus(ECryptoDepositStepStatus.Error);
    }
  }, [
    handleDeposit,
    handleResetDeposit,
    handleWaitTransactionConfirming,
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    setCurrentDepositStatus,
  ]);

  return { onDeposit };
};
