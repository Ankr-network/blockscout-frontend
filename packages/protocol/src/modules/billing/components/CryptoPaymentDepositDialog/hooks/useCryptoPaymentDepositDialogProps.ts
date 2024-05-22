import { useCallback, useMemo } from 'react';
import { EBlockchain } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

import { ECryptoDepositStepStatus, ECurrency } from 'modules/billing/types';
import {
  selectIsAllowanceAnkrSent,
  selectIsAllowanceUsdtSent,
  selectIsAllowanceUsdcSent,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useMyAllowance } from 'domains/account/hooks/useMyAllowance';
import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useNetworkGuard } from 'modules/common/hooks/useNetworkGuard';

interface IUseCryptoPaymentDepositDialogProps {
  currency: ECurrency;
  network: EBlockchain;
  depositStatus?: ECryptoDepositStepStatus;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
}

export const useCryptoPaymentDepositDialogProps = ({
  currency,
  network,
  depositStatus,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
}: IUseCryptoPaymentDepositDialogProps) => {
  const {
    myAllowance,
    isLoading: isMyAllowanceLoading,
    fetchMyAllowance,
  } = useMyAllowance({
    skipFetching: !isCryptoPaymentDepositDialogOpened,
  });

  const { isWrongNetwork, handleSwitchNetwork, isSwitchNetworkLoading } =
    useNetworkGuard(network);

  const isAllowanceAnkrSent = useAppSelector(selectIsAllowanceAnkrSent);
  const isAllowanceUsdtSent = useAppSelector(selectIsAllowanceUsdtSent);
  const isAllowanceUsdcSent = useAppSelector(selectIsAllowanceUsdcSent);

  const { isAllowanceSent } = useMemo(() => {
    switch (currency) {
      case ECurrency.USDT:
        return { isAllowanceSent: isAllowanceUsdtSent };
      case ECurrency.USDC:
        return { isAllowanceSent: isAllowanceUsdcSent };
      case ECurrency.ANKR:
        return { isAllowanceSent: isAllowanceAnkrSent };
      default:
        return { isAllowanceSent: false };
    }
  }, [currency, isAllowanceAnkrSent, isAllowanceUsdtSent, isAllowanceUsdcSent]);

  const {
    amountToDeposit,
    handleResetAllowance: handleResetAllowanceState,
    handleResetTopUpTransaction,
  } = useTopUp();

  const {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    shouldShowOngoingPayment: hasOngoingTransaction,
  } = useOngoingPayments();

  const onClose = useCallback(() => {
    const shouldResetAllowanceState =
      depositStatus !== ECryptoDepositStepStatus.Pending ||
      !isOngoingPaymentPending ||
      isOngoingPaymentError;

    if (shouldResetAllowanceState) {
      handleResetAllowanceState();
      handleResetTopUpTransaction();
    }

    onCryptoPaymentDepositDialogClose();
  }, [
    depositStatus,
    isOngoingPaymentError,
    isOngoingPaymentPending,
    handleResetAllowanceState,
    onCryptoPaymentDepositDialogClose,
    handleResetTopUpTransaction,
  ]);

  const shouldRevokeApproval = useMemo(() => {
    if (
      currency === ECurrency.USDT &&
      myAllowance !== 0 &&
      new BigNumber(myAllowance).isLessThan(amountToDeposit)
    ) {
      return true;
    }

    return false;
  }, [currency, myAllowance, amountToDeposit]);

  const onCheckApproval = useCallback(() => {
    fetchMyAllowance();
  }, [fetchMyAllowance]);

  return {
    amountToDeposit,
    handleSwitchNetwork,
    hasOngoingTransaction,
    isAllowanceSent,
    isMyAllowanceLoading,
    isOngoingPaymentError,
    isSwitchNetworkLoading,
    isWrongNetwork,
    myAllowance,
    onCheckApproval,
    onClose,
    shouldRevokeApproval,
  };
};
