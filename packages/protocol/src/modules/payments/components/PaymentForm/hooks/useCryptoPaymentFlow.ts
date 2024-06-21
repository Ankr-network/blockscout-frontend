import { EBlockchain } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { ICryptoTransaction, INetwork } from 'modules/payments/types';
import { THandleNetworkSwitch } from 'modules/common/hooks/useNetworkGuard';
import {
  setAllowanceAmount,
  setIsApproved,
} from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentDepositStep } from './useCryptoPaymentDepositStep';
import { useCryptoPaymentSuccessStep } from './useCryptoPaymentSuccessStep';
import { useCryptoPaymentSummaryStep } from './useCryptoPaymentSummaryStep';

export interface IUseCryptoPaymentFlowProps {
  handleNetworkChange?: (network: EBlockchain) => void;
  handleNetworkSwitch?: THandleNetworkSwitch;
  handleNetworkReset?: () => void;
  handleResetTxId?: () => void;
  isAllowanceFeeEstimating?: boolean;
  isDepositFeeEstimating?: boolean;
  isNativeTokenPriceLoading?: boolean;
  isNetworkSwitching?: boolean;
  isNetworkWrong?: boolean;
  networks: INetwork[];
  oneTimeAmountProps: IOneTimeAmountProps;
  tx: ICryptoTransaction;
}

export interface IHandleCryptoPaymentDepositDialogOpenParams {
  shouldFetchAllowance?: boolean;
}

export const useCryptoPaymentFlow = ({
  handleNetworkChange,
  handleNetworkReset,
  handleNetworkSwitch,
  handleResetTxId,
  isAllowanceFeeEstimating,
  isDepositFeeEstimating,
  isNativeTokenPriceLoading,
  isNetworkSwitching,
  isNetworkWrong,
  networks,
  oneTimeAmountProps,
  tx,
}: IUseCryptoPaymentFlowProps) => {
  const { amount, currency, from, id: txId, network } = tx;

  const [isAccountChangedOnDepositStep, setIsAccountChangedOnDepositStep] =
    useState(false);

  const { handleFetchAllowance, isLoading: isAllowanceFetching } =
    useFetchAllowance({
      address: from,
      currency,
      network,
      skipFetching: true,
    });

  const {
    isOpened: isCryptoPaymentDepositDialogOpened,
    onClose: handleCryptoPaymentDepositDialogClose,
    onOpen,
  } = useDialog();

  const dispatch = useAppDispatch();
  const handleCryptoPaymentDepositDialogOpen = useCallback(
    async ({
      // We shouldn't refetch allowance if we open an ongoing payment.
      // This options should be set to false when opening an onging payment
      shouldFetchAllowance = true,
    }: IHandleCryptoPaymentDepositDialogOpenParams | void = {}) => {
      onOpen();

      if (shouldFetchAllowance) {
        const { data: allowanceAmount = 0 } = await handleFetchAllowance();
        const isApproved = allowanceAmount >= amount;

        dispatch(setAllowanceAmount({ allowanceAmount, id: txId }));
        dispatch(setIsApproved({ isApproved, id: txId }));
      }
    },
    [amount, dispatch, handleFetchAllowance, onOpen, txId],
  );

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessStep({ tx });

  const {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentSummaryDialogOpened,
    isCryptoPaymentSummaryDialogOpening,
  } = useCryptoPaymentSummaryStep({
    handleNetworkChange,
    handleNetworkReset,
    isAccountChangedOnDepositStep,
    isAllowanceFeeEstimating,
    isConfirming: isAllowanceFetching,
    isDepositFeeEstimating,
    isNativeTokenPriceLoading,
    networks,
    onConfirmButtonClick: handleCryptoPaymentDepositDialogOpen,
    oneTimeAmountProps,
    setIsAccountChangedOnDepositStep,
    tx,
  });

  const { cryptoPaymentDepositDialogProps } = useCryptoPaymentDepositStep({
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    handleNetworkReset,
    handleNetworkSwitch,
    handleResetTxId,
    isCryptoPaymentDepositDialogOpened,
    isNetworkSwitching,
    isNetworkWrong,
    tx,
  });

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    isCryptoPaymentSummaryDialogOpened,
    isCryptoPaymentSummaryDialogOpening,
    setIsAccountChangedOnDepositStep,
  };
};
