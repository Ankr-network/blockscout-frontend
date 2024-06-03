import { EBlockchain } from 'multirpc-sdk';
import { useEffect } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
} from 'modules/payments/types';
import {
  selectCryptoDepositStep,
  selectDepositStepStatus,
} from 'modules/payments/store/selectors';
import { setFromAddress } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useTxByTxId } from 'modules/payments/hooks/useTxByTxId';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

export interface IUseHandleWalletAccountChangeProps {
  currency: ECurrency;
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  network: EBlockchain;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  txId: string;
}

const skipFetching = true;

export const useHandleWalletAccountChange = ({
  currency,
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSummaryDialogOpen,
  network,
  setIsAccountChangedOnDepositStep,
  txId,
}: IUseHandleWalletAccountChangeProps) => {
  const depositStepStatus = useAppSelector(state =>
    selectDepositStepStatus(state, txId),
  );

  const step = useAppSelector(state => selectCryptoDepositStep(state, txId));

  const { hasTx } = useTxByTxId({ txId });
  const { walletAddress } = useWalletAddress();

  const { handleResetAllowanceFetching } = useFetchAllowance({
    currency,
    network,
    skipFetching,
  });

  const { handleRefetchEstimatedAllowanceFee } = useEstimatedAllowanceFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleRefetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleRefetchWalletBalance } = useWalletBalance({
    currency,
    network,
    skipFetching,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (walletAddress && hasTx) {
      const isDeposit = step === ECryptoDepositStep.Deposit;
      const isDepositStepPending =
        depositStepStatus === ECryptoDepositStepStatus.Pending;

      dispatch(setFromAddress({ from: walletAddress, id: txId }));

      // using refetch since parameters of the queries remains the same after
      // wallet address change
      handleRefetchEstimatedAllowanceFee();
      handleRefetchEstimatedDepositFee();
      handleRefetchWalletBalance();

      if (isDeposit && !isDepositStepPending) {
        setIsAccountChangedOnDepositStep(true);

        handleCryptoPaymentDepositDialogClose();

        handleResetAllowanceFetching();

        handleCryptoPaymentSummaryDialogOpen();
      } else {
        setIsAccountChangedOnDepositStep(false);
      }
    }
    // we should only track wallet address
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);
};
