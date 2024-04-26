import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { hasTxConfirmationError } from 'domains/account/actions/topUp/waitTransactionConfirming';
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

    setDepositStatus(ECryptoDepositStepStatus.Pending);

    const depositResponse = await handleDeposit();

    if (depositResponse.isError) {
      return setDepositStatus(ECryptoDepositStepStatus.Error);
    }

    const confirmationResponse = await handleWaitTransactionConfirming();

    if (hasTxConfirmationError(confirmationResponse)) {
      return setDepositStatus(ECryptoDepositStepStatus.Error);
    }

    setDepositStatus(ECryptoDepositStepStatus.Complete);
    onCryptoPaymentDepositDialogClose();

    return onDepositSuccess();
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
