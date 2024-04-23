import { Web3Address } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { createWeb3Service } from 'domains/auth/actions/connect/createWeb3Service';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import {
  setAmountToDeposit,
  setTransactionCurrency,
} from 'domains/account/store/accountTopUpSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectAccountHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';
import { ICryptoPaymentSummaryDialogCommonProps } from '../types';

export interface IUseCryptoPaymentSummaryDialogProps
  extends ICryptoPaymentSummaryDialogCommonProps {
  onClose?: () => void;
  onConfirmButtonClick: () => void;
  onConnectAccountSuccess: (connectedAddress: Web3Address) => void;
  onOpen?: () => void;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
}

export const useCryptoPaymentSummaryDialog = ({
  amount,
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  hasEnoughTokenBalance,
  isAccountChangedOnDepositStep,
  isWalletTokenBalanceLoading,
  network,
  onClose: handleCloseExternal,
  onConfirmButtonClick: handleConfirmButtonClick,
  onConnectAccountSuccess,
  onOpen: onOpenExternal,
  setIsAccountChangedOnDepositStep,
  totalAmount,
}: IUseCryptoPaymentSummaryDialogProps) => {
  const { isOpened, onClose: handleClose, onOpen } = useDialog();

  const { hasWeb3Service } = useHasWeb3Service();

  const dispatch = useAppDispatch();
  const handleCryptoPaymentSummaryDialogOpen = useCallback(async () => {
    if (!hasWeb3Service && hasMetamask()) {
      await dispatch(
        createWeb3Service.initiate({
          params: { walletId: INJECTED_WALLET_ID },
        }),
      );
    }

    onOpenExternal?.();

    onOpen();
  }, [dispatch, hasWeb3Service, onOpen, onOpenExternal]);

  const { connectedAddress, walletIcon } = useConnectedAddress();
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

  const { selectedGroupAddress } = useSelectedUserGroup();

  const onConfirmButtonClick = useCallback(() => {
    const address = selectedGroupAddress || connectedAddress || personalAddress;
    const amountToDeposit = new BigNumber(amount);

    dispatch(setAmountToDeposit({ address, amountToDeposit }));
    dispatch(setTransactionCurrency({ address, currency }));

    onClose();

    handleConfirmButtonClick();
  }, [
    amount,
    connectedAddress,
    currency,
    dispatch,
    handleConfirmButtonClick,
    onClose,
    personalAddress,
    selectedGroupAddress,
  ]);

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(
      () => ({
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConnecting,
        isWalletTokenBalanceLoading,
        network,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick: handleConnectAccount,
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
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConnecting,
        isOpened,
        isWalletTokenBalanceLoading,
        network,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        totalAmount,
        walletIcon,
      ],
    );

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
