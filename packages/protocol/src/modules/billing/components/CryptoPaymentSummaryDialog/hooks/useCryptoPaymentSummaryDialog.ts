import { Web3Address } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { createWeb3Service } from 'domains/auth/actions/connect/createWeb3Service';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectAccountHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';
import {
  setAmountToDeposit,
  setTransactionCurrency,
} from 'domains/account/store/accountTopUpSlice';

import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';
import { IUseCryptoPaymentSummaryDialogProps } from '../types';

interface IUseCryptoPaymentSummaryDialog
  extends IUseCryptoPaymentSummaryDialogProps {
  onClose?: () => void;
  onConfirmButtonClick: () => void;
  onConnectAccountSuccess: (connectedAddress: Web3Address) => void;
}

export const useCryptoPaymentSummaryDialog = ({
  amount,
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  network,
  onClose: handleCloseExternal,
  onConfirmButtonClick: handleConfirmButtonClick,
  onConnectAccountSuccess,
  totalAmount,
}: IUseCryptoPaymentSummaryDialog) => {
  const { isOpened, onClose: handleClose, onOpen } = useDialog();

  const { hasWeb3Service } = useHasWeb3Service();

  const dispatch = useDispatch();
  const handleCryptoPaymentSummaryDialogOpen = useCallback(() => {
    if (!hasWeb3Service) {
      dispatch(
        createWeb3Service.initiate({
          params: { walletId: INJECTED_WALLET_ID },
        }),
      );
    }

    onOpen();
  }, [dispatch, hasWeb3Service, onOpen]);

  const { connectedAddress, walletIcon } = useConnectedAddress();
  const { address: personalAddress } = useAuth();

  const { isConnecting, handleConnectAccount } = useConnectAccountHandler({
    onSuccess: onConnectAccountSuccess,
  });

  const onAnotherAddressButtonClick = handleConnectAccount;

  const onClose = useCallback(() => {
    handleClose();
    handleCloseExternal?.();
  }, [handleClose, handleCloseExternal]);

  const onCancelButtonClick = onClose;

  const onConfirmButtonClick = useCallback(() => {
    dispatch(
      setAmountToDeposit({
        address: connectedAddress || personalAddress,
        amountToDeposit: new BigNumber(amount),
      }),
    );
    dispatch(
      setTransactionCurrency({
        address: connectedAddress || personalAddress,
        currency,
      }),
    );

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
  ]);

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(() => {
      return {
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        isConnecting,
        network,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick: handleConnectAccount,
        open: isOpened,
        totalAmount,
        walletIcon,
      };
    }, [
      amount,
      approvalFeeDetails,
      connectedAddress,
      currency,
      depositFeeDetails,
      handleConnectAccount,
      isConnecting,
      isOpened,
      network,
      onAnotherAddressButtonClick,
      onCancelButtonClick,
      onClose,
      onConfirmButtonClick,
      totalAmount,
      walletIcon,
    ]);

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
