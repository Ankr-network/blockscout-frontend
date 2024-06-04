import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useSendAllowance } from 'modules/payments/hooks/useSendAllowance';
import { useWaitForAllowanceConfirmation } from 'modules/payments/hooks/useWaitForAllowanceConfirmation';

export interface IUseCryptoPaymentSendAllowanceHandler {
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentSendAllowanceHandler = ({
  tx = defaultCryptoTx,
}: IUseCryptoPaymentSendAllowanceHandler) => {
  const { currency, network } = tx;

  const {
    handleResetAllowanceSending: resetAllowanceSending,
    handleSendAllowance: sendAllowance,
    isAllowanceSent,
  } = useSendAllowance({ tx });
  const {
    handleWaitForAllowanceConfirmation,
    handleResetAllowanceConfirmation,
  } = useWaitForAllowanceConfirmation({ tx });
  const { handleFetchAllowance } = useFetchAllowance({
    currency,
    network,
    skipFetching: true,
  });

  const handleSendAllowance = useCallback(async () => {
    const sendAllowanceResponse = await sendAllowance();

    if (isMutationSuccessful(sendAllowanceResponse)) {
      const confirmationResponse = await handleWaitForAllowanceConfirmation();

      if (isMutationSuccessful(confirmationResponse)) {
        await handleFetchAllowance();
      }
    }
  }, [handleFetchAllowance, handleWaitForAllowanceConfirmation, sendAllowance]);

  const handleResetAllowanceSending = useCallback(() => {
    resetAllowanceSending();
    handleResetAllowanceConfirmation();
  }, [handleResetAllowanceConfirmation, resetAllowanceSending]);

  return { handleResetAllowanceSending, handleSendAllowance, isAllowanceSent };
};
