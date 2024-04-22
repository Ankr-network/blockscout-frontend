import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { hasResponseError } from 'modules/common/utils/hasResponseError';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useOneTimeDialogState } from './useOneTimeDialogState';

type TPropsToExtend = Pick<
  ReturnType<typeof useOneTimeDialogState>,
  'setDepositStatus'
>;

export interface IUseOneTimeDepositHandler extends TPropsToExtend {
  onCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
}

export const useOneTimeDepositHandler = ({
  onCryptoPaymentDepositDialogClose,
  onDepositSuccess,
  setDepositStatus,
}: IUseOneTimeDepositHandler) => {
  const { handleDeposit, handleResetDeposit, handleWaitTransactionConfirming } =
    useTopUp();

  const onDeposit = useCallback(async () => {
    handleResetDeposit();

    setDepositStatus(ECryptoDepositStepStatus.Confirmation);
    const depositResponse = await handleDeposit();

    setDepositStatus(ECryptoDepositStepStatus.Pending);

    const confirmationResponse = await handleWaitTransactionConfirming();

    try {
      const hasDepositError =
        hasResponseError(depositResponse) ||
        hasResponseError(confirmationResponse);

      if (hasDepositError) {
        setDepositStatus(ECryptoDepositStepStatus.Error);
      } else {
        setDepositStatus(ECryptoDepositStepStatus.Complete);
        onCryptoPaymentDepositDialogClose();
        onDepositSuccess();
      }
    } catch (error) {
      setDepositStatus(ECryptoDepositStepStatus.Error);
    }
  }, [
    handleDeposit,
    handleResetDeposit,
    handleWaitTransactionConfirming,
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    setDepositStatus,
  ]);

  return { onDeposit };
};
