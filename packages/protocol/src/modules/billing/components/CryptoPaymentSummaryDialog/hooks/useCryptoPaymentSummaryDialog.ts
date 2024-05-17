import { Web3Address } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import {
  setAmountToDeposit,
  setTransactionCurrency,
  setTransactionNetwork,
} from 'domains/account/store/accountTopUpSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectAccountHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useWalletMeta } from 'domains/wallet/hooks/useWalletMeta';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import { ICryptoPaymentSummaryDialogCommonProps } from '../types';
import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';
import { IOneTimeAmountProps } from '../../PaymentForm/components/OneTimeAmount';

export interface IUseCryptoPaymentSummaryDialogProps
  extends ICryptoPaymentSummaryDialogCommonProps {
  oneTimeAmountProps: IOneTimeAmountProps;
  onClose?: () => void;
  onConfirmButtonClick: () => void;
  onConnectAccountSuccess: (connectedAddress: Web3Address) => void;
  onOpen?: () => void;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
}

export const useCryptoPaymentSummaryDialog = ({
  amount,
  currency,
  onClose: handleCloseExternal,
  onConfirmButtonClick: handleConfirmButtonClick,
  onConnectAccountSuccess,
  onOpen: onOpenExternal,
  setIsAccountChangedOnDepositStep,
  approvalFeeDetails,
  depositFeeDetails,
  network,
  hasEnoughTokenBalance,
  isAccountChangedOnDepositStep,
  isWalletTokenBalanceLoading,
  totalAmount,
  networkOptions,
  oneTimeAmountProps,
  handleNetworkChange,
}: IUseCryptoPaymentSummaryDialogProps) => {
  const { isOpened, onClose: handleClose, onOpen } = useDialog();

  const { handleCreateWeb3Service } = useWeb3Service();

  const dispatch = useAppDispatch();
  const handleCryptoPaymentSummaryDialogOpen = useCallback(async () => {
    await handleCreateWeb3Service();

    onOpenExternal?.();

    onOpen();
  }, [handleCreateWeb3Service, onOpen, onOpenExternal]);

  const { walletAddress: connectedAddress } = useWalletAddress();
  const { walletMeta } = useWalletMeta();
  const { address: personalAddress } = useAuth();

  const handleConnectAccountSuccess = useCallback(
    (address: Web3Address) => {
      setIsAccountChangedOnDepositStep(false);

      onConnectAccountSuccess(address);
    },
    [onConnectAccountSuccess, setIsAccountChangedOnDepositStep],
  );
  const { isConnecting, handleConnectAccount } = useConnectAccountHandler({
    onSuccess: handleConnectAccountSuccess,
  });

  const onAnotherAddressButtonClick = handleConnectAccount;

  const onClose = useCallback(() => {
    handleClose();
    handleCloseExternal?.();
    setIsAccountChangedOnDepositStep(false);
  }, [handleClose, handleCloseExternal, setIsAccountChangedOnDepositStep]);

  const onCancelButtonClick = onClose;

  const onConfirmButtonClick = useCallback(() => {
    const address = connectedAddress || personalAddress;
    const amountToDeposit = new BigNumber(amount);

    dispatch(setAmountToDeposit({ address, amountToDeposit }));
    dispatch(setTransactionCurrency({ address, currency }));
    dispatch(setTransactionNetwork({ address, network }));

    onClose();

    handleConfirmButtonClick();
  }, [
    amount,
    connectedAddress,
    currency,
    dispatch,
    handleConfirmButtonClick,
    network,
    onClose,
    personalAddress,
  ]);

  const walletIcon = walletMeta?.icon;

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(
      () => ({
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        handleNetworkChange,
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConnecting,
        isWalletTokenBalanceLoading,
        network,
        networkOptions,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick: handleConnectAccount,
        oneTimeAmountProps,
        open: isOpened,
        totalAmount,
        walletIcon,
      }),
      [
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        handleConnectAccount,
        handleNetworkChange,
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConnecting,
        isOpened,
        isWalletTokenBalanceLoading,
        network,
        networkOptions,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        oneTimeAmountProps,
        totalAmount,
        walletIcon,
      ],
    );

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
