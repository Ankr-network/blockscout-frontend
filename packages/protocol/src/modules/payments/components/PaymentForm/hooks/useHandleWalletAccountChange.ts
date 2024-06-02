import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECurrency } from 'modules/payments/types';
import { setFromAddress } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useNativeTokenPrice } from 'modules/payments/hooks/useNativeTokenPrice';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

export interface IUseHandleWalletAccountChangeProps {
  currency: ECurrency;
  network: EBlockchain;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  txId: string;
}

export const useHandleWalletAccountChange = ({
  currency,
  network,
  setIsAccountChangedOnDepositStep,
  txId,
}: IUseHandleWalletAccountChangeProps) => {
  const { handleRefetchNativeTokenPrice } = useNativeTokenPrice({
    network,
    skipFetching: true,
  });

  const { handleRefetchEstimatedAllowanceFee } = useEstimatedAllowanceFee({
    currency,
    skipFetching: true,
    txId,
  });

  const { handleRefetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching: true,
    txId,
  });

  const { handleRefetchWalletBalance } = useWalletBalance({
    currency,
    network,
    skipFetching: true,
  });

  const dispatch = useAppDispatch();

  const handleWalletAccountChange = useCallback(
    async (connectedAddress: string) => {
      dispatch(setFromAddress({ from: connectedAddress, id: txId }));

      setIsAccountChangedOnDepositStep(false);

      handleRefetchNativeTokenPrice();
      handleRefetchEstimatedAllowanceFee();
      handleRefetchEstimatedDepositFee();
      handleRefetchWalletBalance();
    },
    [
      dispatch,
      handleRefetchNativeTokenPrice,
      handleRefetchEstimatedAllowanceFee,
      handleRefetchEstimatedDepositFee,
      handleRefetchWalletBalance,
      setIsAccountChangedOnDepositStep,
      txId,
    ],
  );

  return { handleWalletAccountChange };
};
