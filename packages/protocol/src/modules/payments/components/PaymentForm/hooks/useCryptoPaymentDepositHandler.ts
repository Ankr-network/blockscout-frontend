import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { setDepositError } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useDeposit } from 'modules/payments/hooks/useDeposit';
import { useWaitForDepositConfirmation } from 'modules/payments/hooks/useWaitForDepositConfirmation';

export interface IUseCryptoPaymentDepositHandlerProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentDepositHandler = ({
  handleCryptoPaymentDepositDialogClose,
  onDepositSuccess: handleDepositSuccess,
  tx = defaultCryptoTx,
}: IUseCryptoPaymentDepositHandlerProps) => {
  const txId = tx.id;

  const { handleDeposit: deposit, handleResetDeposit: resetDeposit } =
    useDeposit({ tx });
  const { handleResetDepositConfirmation, handleWaitForDepositConfirmation } =
    useWaitForDepositConfirmation({ tx });

  const dispatch = useAppDispatch();

  const handleDeposit = useCallback(async () => {
    // to reset deposit error if exists
    dispatch(setDepositError({ depositError: undefined, id: txId }));

    const depositResponse = await deposit();

    if (isMutationSuccessful(depositResponse)) {
      const confirmationResponse = await handleWaitForDepositConfirmation();

      if (isMutationSuccessful(confirmationResponse)) {
        handleCryptoPaymentDepositDialogClose();
        handleDepositSuccess();
      }
    }
  }, [
    deposit,
    dispatch,
    handleCryptoPaymentDepositDialogClose,
    handleDepositSuccess,
    handleWaitForDepositConfirmation,
    txId,
  ]);

  const handleResetDeposit = useCallback(() => {
    resetDeposit();
    handleResetDepositConfirmation();
  }, [resetDeposit, handleResetDepositConfirmation]);

  return { handleDeposit, handleResetDeposit };
};
