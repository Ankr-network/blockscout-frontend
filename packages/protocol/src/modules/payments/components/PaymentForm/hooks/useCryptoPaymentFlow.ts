import { EBlockchain } from 'multirpc-sdk';
import { useState } from 'react';

import { ICryptoTransaction, INetwork } from 'modules/payments/types';
import { useDialog } from 'modules/common/hooks/useDialog';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentDepositStep } from './useCryptoPaymentDepositStep';
import { useCryptoPaymentSuccessStep } from './useCryptoPaymentSuccessStep';
import { useCryptoPaymentSummaryStep } from './useCryptoPaymentSummaryStep';

export interface IUseOneTimeCryptoPaymentProps {
  handleNetworkChange: (network: EBlockchain) => void;
  networks: INetwork[];
  oneTimeAmountProps: IOneTimeAmountProps;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentFlow = ({
  handleNetworkChange,
  networks,
  oneTimeAmountProps,
  tx,
}: IUseOneTimeCryptoPaymentProps) => {
  const [isAccountChangedOnDepositStep, setIsAccountChangedOnDepositStep] =
    useState(false);

  const {
    isOpened: isCryptoPaymentDepositDialogOpened,
    onClose: handleCryptoPaymentDepositDialogClose,
    onOpen: handleCryptoPaymentDepositDialogOpen,
  } = useDialog();

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessStep({ tx });

  const {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  } = useCryptoPaymentSummaryStep({
    handleNetworkChange,
    isAccountChangedOnDepositStep,
    networks,
    onConfirmButtonClick: handleCryptoPaymentDepositDialogOpen,
    oneTimeAmountProps,
    setIsAccountChangedOnDepositStep,
    tx,
  });

  const { cryptoPaymentDepositDialogProps } = useCryptoPaymentDepositStep({
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onDepositSuccess: handleCryptoPaymentSuccessDialogOpen,
    setIsAccountChangedOnDepositStep,
    tx,
  });

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
