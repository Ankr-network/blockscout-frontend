import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ICryptoTransaction, INetwork } from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useConnectWalletAccountMutation } from 'domains/wallet/actions/connectWalletAccount';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';

export interface IUseCryptoPaymentSummaryStepProps {
  handleNetworkChange?: (network: EBlockchain) => void;
  handleNetworkReset?: () => void;
  isAccountChangedOnDepositStep: boolean;
  isAllowanceFeeEstimating?: boolean;
  isConfirming: boolean;
  isDepositFeeEstimating?: boolean;
  isNativeTokenPriceLoading?: boolean;
  networks: INetwork[];
  onConfirmButtonClick: () => void;
  oneTimeAmountProps: IOneTimeAmountProps;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentSummaryStep = ({
  handleNetworkChange,
  handleNetworkReset,
  isAccountChangedOnDepositStep,
  isAllowanceFeeEstimating = false,
  isConfirming,
  isDepositFeeEstimating = false,
  isNativeTokenPriceLoading = false,
  networks,
  onConfirmButtonClick,
  oneTimeAmountProps,
  setIsAccountChangedOnDepositStep,
  tx,
}: IUseCryptoPaymentSummaryStepProps) => {
  const { walletAddress } = useWalletAddress();

  const {
    allowanceFeeDetailsEstimated: allowanceFeeDetails,
    amount,
    currency,
    depositFeeDetailsEstimated: depositFeeDetails,
    from,
    id: txId,
    network,
  } = tx;

  const fromAddress = from || walletAddress!;

  const fromAddressRef = useAutoupdatedRef(fromAddress);

  const {
    fetchWalletBalanceRef,
    isLoading: isWalletBalanceLoading,
    walletBalance,
  } = useWalletBalance({
    address: fromAddress,
    currency,
    network,
    skipFetching: true,
  });

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      allowanceFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const isLoading =
    isWalletBalanceLoading ||
    isTotalAmountLoading ||
    isAllowanceFeeEstimating ||
    isDepositFeeEstimating ||
    isNativeTokenPriceLoading;

  const onOpen = useCallback(() => {
    if (fromAddressRef.current) {
      fetchWalletBalanceRef.current();
    }
  }, [fetchWalletBalanceRef, fromAddressRef]);

  const dispatch = useAppDispatch();
  const onClose = useCallback(() => {
    handleNetworkReset?.();
    dispatch(removeCryptoTx({ id: txId }));
  }, [dispatch, handleNetworkReset, txId]);

  const [handleConnectWalletAccount, { isLoading: isWalletAccountConnecting }] =
    useConnectWalletAccountMutation();

  const onConnectButtonClick = useCallback(async () => {
    await handleConnectWalletAccount();
  }, [handleConnectWalletAccount]);

  const hasEnoughTokenBalance = new BigNumber(walletBalance).gte(amount);

  const {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  } = useCryptoPaymentSummaryDialog({
    allowanceFeeDetails,
    amount,
    currency,
    depositFeeDetails,
    handleConnectWalletAccount,
    handleNetworkChange,
    hasEnoughTokenBalance,
    isAccountChangedOnDepositStep,
    isConfirming,
    isLoading,
    isWalletAccountConnecting,
    network,
    networks,
    onClose,
    onConfirmButtonClick,
    onConnectButtonClick,
    onOpen,
    oneTimeAmountProps,
    setIsAccountChangedOnDepositStep,
    totalAmount,
  });

  const isCryptoPaymentSummaryDialogOpened =
    cryptoPaymentSummaryDialogProps.open;

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentSummaryDialogOpened,
    isCryptoPaymentSummaryDialogOpening: isLoading,
  };
};
