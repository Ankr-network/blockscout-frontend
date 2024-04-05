import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  CryptoPaymentSuccessDialog,
  useCryptoPaymentSuccessDialog,
} from 'modules/billing/components/CryptoPaymentSuccessDialog';
import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';

import { useDetailsButtonStyles } from './useDetailsButtonStyles';

export interface IDetailsButtonProps {
  amount: string;
  txHash: string;
}

export const DetailsButton = ({ amount, txHash }: IDetailsButtonProps) => {
  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount: Number(amount),
    currency: ECurrency.ANKR,
    network: ENetwork.ETH,
    paymentType: EPaymentType.OneTime,
    txHash,
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
