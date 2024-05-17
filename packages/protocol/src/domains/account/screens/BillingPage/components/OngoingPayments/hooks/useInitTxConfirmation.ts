import { useEffect } from 'react';

import { TTxConfirmationResponse } from 'domains/account/actions/topUp/waitTransactionConfirming';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

export type TOnInitTxConfirmationSuccess = (
  response: TTxConfirmationResponse,
) => void;

export interface IUseInitTxConfirmationProps {
  onSuccess?: TOnInitTxConfirmationSuccess;
  txHash?: string;
}

export const useInitTxConfirmation = ({
  onSuccess,
  txHash,
}: IUseInitTxConfirmationProps) => {
  const {
    handleWaitTransactionConfirming,
    isWaitTransactionConfirmingUninitialized,
  } = useTopUp();

  const { handleCreateWeb3Service } = useWeb3Service();

  useEffect(() => {
    if (txHash && isWaitTransactionConfirmingUninitialized) {
      // to avoid state updating on an unmounted component
      let shouldUpdate = true;

      // We must create web3Service to correctly dispaly ongoing payment status.
      // We only create it when we know that a user has at least one ongoing payment.
      // That means that no extra MM windows will be opened.
      // But in case when a user closes the page with pending ongoing payments,
      // then unconnects all his addresses from the site in MM and then opens
      // the page with ongoing payments again, there might be an extra MM window
      // asking for address connection.
      handleCreateWeb3Service()
        .then(handleWaitTransactionConfirming)
        .then(confirmationResponse => {
          if (shouldUpdate) {
            onSuccess?.(confirmationResponse);
          }
        });

      return () => {
        shouldUpdate = false;
      };
    }

    return () => {};
    // we should only track tx hash here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash]);
};
