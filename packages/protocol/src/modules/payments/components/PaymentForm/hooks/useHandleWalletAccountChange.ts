import { EBlockchain } from 'multirpc-sdk';
import { useEffect } from 'react';

import { ECryptoDepositStepStatus, ECurrency } from 'modules/payments/types';
import { selectDepositStepStatus } from 'modules/payments/store/selectors';
import {
  setAllowanceAmount,
  setFromAddress,
  setIsApproved,
} from 'modules/payments/store/paymentsSlice';
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
  handleCreateCryptoTx: () => Promise<void>;
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  isCryptoPaymentSummaryDialogOpened: boolean;
  network: EBlockchain;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  txId: string;
}

const skipFetching = true;

export const useHandleWalletAccountChange = ({
  currency,
  handleCreateCryptoTx,
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  isCryptoPaymentSummaryDialogOpened,
  network,
  setIsAccountChangedOnDepositStep,
  txId,
}: IUseHandleWalletAccountChangeProps) => {
  const depositStepStatus = useAppSelector(state =>
    selectDepositStepStatus(state, txId),
  );

  const { hasTx } = useTxByTxId({ txId });
  const { walletAddress } = useWalletAddress();

  const { handleResetAllowanceFetching } = useFetchAllowance({
    address: walletAddress!,
    currency,
    network,
    skipFetching,
  });

  const { handleFetchEstimatedAllowanceFee } = useEstimatedAllowanceFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleFetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleFetchWalletbalance } = useWalletBalance({
    address: walletAddress!,
    currency,
    network,
    skipFetching,
  });

  const dispatch = useAppDispatch();

  const isPaymentFlowStarted =
    isCryptoPaymentDepositDialogOpened || isCryptoPaymentSummaryDialogOpened;

  useEffect(() => {
    const isDepositStepPending =
      depositStepStatus === ECryptoDepositStepStatus.Pending;

    if (walletAddress) {
      if (hasTx) {
        dispatch(setFromAddress({ from: walletAddress, id: txId }));

        handleFetchWalletbalance();
        handleFetchEstimatedAllowanceFee();
        handleFetchEstimatedDepositFee();
      } else if (isPaymentFlowStarted) {
        handleFetchWalletbalance();
        handleCreateCryptoTx();
      }
    }

    // to go back to the summary step to re-init the payment flow
    if (isCryptoPaymentDepositDialogOpened && !isDepositStepPending) {
      setIsAccountChangedOnDepositStep(true);

      handleCryptoPaymentDepositDialogClose();

      handleResetAllowanceFetching();

      // to reset allowance in the tx object
      dispatch(setAllowanceAmount({ allowanceAmount: 0, id: txId }));
      dispatch(setIsApproved({ isApproved: false, id: txId }));

      handleCryptoPaymentSummaryDialogOpen();
    } else {
      setIsAccountChangedOnDepositStep(false);
    }
    // we should only track wallet address
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);
};
