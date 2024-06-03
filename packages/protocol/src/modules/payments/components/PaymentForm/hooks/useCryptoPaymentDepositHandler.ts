import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
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
  const { handleDeposit: deposit, handleResetDeposit: resetDeposit } =
    useDeposit({ tx });
  const { handleWaitForDepositConfirmation, handleResetDepositConfirmation } =
    useWaitForDepositConfirmation({ tx });

  const handleDeposit = useCallback(async () => {
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
    handleCryptoPaymentDepositDialogClose,
    handleDepositSuccess,
    handleWaitForDepositConfirmation,
  ]);

  const handleResetDeposit = useCallback(() => {
    resetDeposit();
    handleResetDepositConfirmation();
  }, [resetDeposit, handleResetDepositConfirmation]);

  return { handleDeposit, handleResetDeposit };
};
