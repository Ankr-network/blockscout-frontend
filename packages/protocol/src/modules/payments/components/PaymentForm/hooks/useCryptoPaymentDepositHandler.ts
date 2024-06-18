import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { setDepositError } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';
import { useDeposit } from 'modules/payments/hooks/useDeposit';
import { useWaitForDepositConfirmation } from 'modules/payments/hooks/useWaitForDepositConfirmation';

export interface IUseCryptoPaymentDepositHandlerProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentSuccessDialogOpen: () => void;
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentDepositHandler = ({
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSuccessDialogOpen,
  tx = defaultCryptoTx,
}: IUseCryptoPaymentDepositHandlerProps) => {
  const txId = tx.id;

  const txIdRef = useAutoupdatedRef(txId);

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

        // if we don't have txId or the txId the deposit has been made with and
        // the actual txId from the ref are not the same, we shouldn't open the
        // success dialog
        if (txIdRef.current && txId === txIdRef.current) {
          handleCryptoPaymentSuccessDialogOpen();
        }
      }
    }
  }, [
    deposit,
    dispatch,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    handleWaitForDepositConfirmation,
    txId,
    txIdRef,
  ]);

  const handleResetDeposit = useCallback(() => {
    resetDeposit();
    handleResetDepositConfirmation();
  }, [resetDeposit, handleResetDepositConfirmation]);

  return { handleDeposit, handleResetDeposit };
};
