import { Button } from '@mui/material';
import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import {
  CryptoPaymentSuccessDialog,
  useCryptoPaymentSuccessDialog,
} from 'modules/billing/components/CryptoPaymentSuccessDialog';
import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import { useDetailsButtonStyles } from './useDetailsButtonStyles';

export interface IDetailsButtonProps {
  amount: string;
  network: EBlockchain;
  currency: ECurrency;
  txHash: string;
  onCloseButtonClick?: () => void;
}

export const DetailsButton = ({
  amount,
  network,
  currency,
  txHash,
  onCloseButtonClick,
}: IDetailsButtonProps) => {
  const { handleCreateWeb3Service: onOpen } = useWeb3Service();

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount: Number(amount),
    currency,
    depositTxHash: txHash,
    network,
    onCloseButtonClick,
    onOpen,
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
