import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useAppDispatch } from 'store/useAppDispatch';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useSendAllowance } from 'modules/payments/hooks/useSendAllowance';
import { useWaitForAllowanceConfirmation } from 'modules/payments/hooks/useWaitForAllowanceConfirmation';
import { setAllowanceError } from 'modules/payments/store/paymentsSlice';

export interface IUseCryptoPaymentSendAllowanceHandler {
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentSendAllowanceHandler = ({
  tx = defaultCryptoTx,
}: IUseCryptoPaymentSendAllowanceHandler) => {
  const { currency, from, id: txId, network } = tx;

  const {
    handleResetAllowanceSending: resetAllowanceSending,
    handleSendAllowance: sendAllowance,
    isAllowanceSent,
  } = useSendAllowance({ tx });

  const {
    handleResetAllowanceConfirmation,
    handleWaitForAllowanceConfirmation,
  } = useWaitForAllowanceConfirmation({ tx });

  const { handleFetchAllowance } = useFetchAllowance({
    address: from,
    currency,
    network,
    skipFetching: true,
  });

  const dispatch = useAppDispatch();

  const handleSendAllowance = useCallback(async () => {
    // to reset allowance error if exists
    dispatch(setAllowanceError({ allowanceError: undefined, id: txId }));

    const sendAllowanceResponse = await sendAllowance();

    if (isMutationSuccessful(sendAllowanceResponse)) {
      const confirmationResponse = await handleWaitForAllowanceConfirmation();

      if (isMutationSuccessful(confirmationResponse)) {
        await handleFetchAllowance();
      }
    }
  }, [
    dispatch,
    handleFetchAllowance,
    handleWaitForAllowanceConfirmation,
    sendAllowance,
    txId,
  ]);

  const handleResetAllowanceSending = useCallback(() => {
    resetAllowanceSending();
    handleResetAllowanceConfirmation();
  }, [handleResetAllowanceConfirmation, resetAllowanceSending]);

  return { handleResetAllowanceSending, handleSendAllowance, isAllowanceSent };
};
