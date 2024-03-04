import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IUseCryptoPaymentDepositDialogProps } from '../types';

export const useCryptoPaymentDepositDialog = ({
  amount,
  amountUSD,
  currency,
  step,
  network,
}: IUseCryptoPaymentDepositDialogProps) => {
  const {
    isOpened,
    onClose,
    onOpen: handleCryptoPaymentDepositDialogOpen,
  } = useDialog();

  const cryptoPaymentDepositDialogProps = useMemo(
    () => ({
      amount,
      amountUSD,
      currency,
      onClose,
      open: isOpened,
      step,
      network,
    }),
    [amount, amountUSD, currency, isOpened, onClose, step, network],
  );

  return {
    cryptoPaymentDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  };
};
