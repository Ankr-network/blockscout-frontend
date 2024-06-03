import { Button } from '@mui/material';
import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import {
  CryptoPaymentSuccessDialog,
  useCryptoPaymentSuccessDialog,
} from 'modules/payments/components/CryptoPaymentSuccessDialog';
import { ECurrency, EPaymentType } from 'modules/payments/types';

import { useDetailsButtonStyles } from './useDetailsButtonStyles';

export interface IDetailsButtonProps {
  amount: string;
  currency: ECurrency;
  network: EBlockchain;
  onDialogClose?: () => void;
  txHash: string;
}

export const DetailsButton = ({
  amount,
  currency,
  network,
  onDialogClose,
  txHash,
}: IDetailsButtonProps) => {
  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount: Number(amount),
    currency,
    depositTxHash: txHash,
    network,
    onClose: onDialogClose,
    paymentType: EPaymentType.OneTime,
  });

  const { classes } = useDetailsButtonStyles();

  return (
    <>
      <Button
        variant="outlined"
        size="extraSmall"
        className={classes.buttonRoot}
        onClick={handleCryptoPaymentSuccessDialogOpen}
      >
        {t('account.payment-table.details')}
      </Button>
      <CryptoPaymentSuccessDialog {...cryptoPaymentSuccessDialogProps} />
    </>
  );
};
