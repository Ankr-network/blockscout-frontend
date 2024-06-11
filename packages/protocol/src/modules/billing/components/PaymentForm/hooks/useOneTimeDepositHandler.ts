import { useCallback, useEffect } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { TOnInitTxConfirmationSuccess } from 'domains/account/screens/BillingPage/components/OngoingPayments/hooks/useInitTxConfirmation';
import { hasTxConfirmationError } from 'domains/account/actions/topUp/waitTransactionConfirming';
import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useOneTimeDialogState } from './useOneTimeDialogState';

type TPropsToExtend = Pick<
  ReturnType<typeof useOneTimeDialogState>,
  'setDepositStatus'
>;

export interface IUseOneTimeDepositHandler extends TPropsToExtend {
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
}

export const useOneTimeDepositHandler = ({
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  onDepositSuccess: handleDepositSuccess,
  setDepositStatus,
}: IUseOneTimeDepositHandler) => {
  const { handleDeposit, handleResetDeposit, handleWaitTransactionConfirming } =
    useTopUp();

  const onDepositSuccess = useCallback(() => {
    setDepositStatus(ECryptoDepositStepStatus.Complete);
    onCryptoPaymentDepositDialogClose();
    handleDepositSuccess();
  }, [
    handleDepositSuccess,
    onCryptoPaymentDepositDialogClose,
    setDepositStatus,
  ]);

  const onDeposit = useCallback(async () => {
    handleResetDeposit();

    setDepositStatus(ECryptoDepositStepStatus.Pending);

    const depositResponse = await handleDeposit();

    if (depositResponse.isError) {
      return setDepositStatus(ECryptoDepositStepStatus.Error);
    }

    setDepositStatus(ECryptoDepositStepStatus.ConfirmationBlocksWaiting);

    const confirmationResponse = await handleWaitTransactionConfirming();

    if (hasTxConfirmationError(confirmationResponse)) {
      return setDepositStatus(ECryptoDepositStepStatus.Error);
    }

    return onDepositSuccess();
  }, [
    handleDeposit,
    handleResetDeposit,
    handleWaitTransactionConfirming,
    onDepositSuccess,
    setDepositStatus,
  ]);

  const onInitTxConfirmationSuccess = useCallback<TOnInitTxConfirmationSuccess>(
    confirmationResponse => {
      if (hasTxConfirmationError(confirmationResponse)) {
        setDepositStatus(ECryptoDepositStepStatus.Error);
      }
    },
    [setDepositStatus],
  );

  const { isSuccessState } = useOngoingPayments({
    onInitTxConfirmationSuccess,
  });

  // To handle the case when a user reloads the page during deposit pending,
  // In that case onDeposit callback is not called, so success state isn't handled
  useEffect(() => {
    if (isSuccessState && isCryptoPaymentDepositDialogOpened) {
      onDepositSuccess();
    }
  }, [isCryptoPaymentDepositDialogOpened, isSuccessState, onDepositSuccess]);

  return { onDeposit };
};
