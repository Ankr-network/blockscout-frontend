import { OverlaySpinner } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { CheckMarkImage } from 'modules/common/components/CheckMarkImage';
import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { AddressDetails } from './components/AddressDetails';
import { Header } from './components/Header';
import { IUseSuccessCryptoPaymentDialogProps } from './types';
import { TxDetails } from './components/TxDetails';
import { useSuccessCryptoPaymentDialogStyles } from './useSuccessCryptoPaymentDialogStyles';

export interface ISuccessCryptoPaymentDialogProps
  extends IDialogProps,
    IUseSuccessCryptoPaymentDialogProps {
  isLoading?: boolean;
}

export const SuccessCryptoPaymentDialog = ({
  amount,
  amountUsd,
  approval,
  currency,
  depositFee,
  depositFeeUSD,
  depositTxURL,
  fromAddress,
  network,
  paymentType,
  toAddress,
  txDate,
  isLoading = false,
  onClose,
  ...dialogProps
}: ISuccessCryptoPaymentDialogProps) => {
  const { classes } = useSuccessCryptoPaymentDialogStyles();

  const hasDepositTxURL = Boolean(depositTxURL);

  const { handleResetTopUpTransaction } = useTopUp();

  const resetTransactionAndCloseDialog = useCallback(() => {
    handleResetTopUpTransaction();

    if (onClose) {
      onClose();
    }
  }, [handleResetTopUpTransaction, onClose]);

  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      classes={classes}
      title={!isLoading && <CheckMarkImage />}
    >
      {isLoading ? (
        <OverlaySpinner />
      ) : (
        <>
          <Header className={classes.header} txDate={txDate} />
          <AddressDetails
            className={classes.addressDetails}
            from={fromAddress}
            to={toAddress}
          />
          <TxDetails
            amount={amount}
            amountUsd={amountUsd}
            approval={approval}
            currency={currency}
            depositFee={depositFee}
            depositFeeUSD={depositFeeUSD}
            depositTxURL={depositTxURL}
            network={network}
            paymentType={paymentType}
          />
          {hasDepositTxURL && (
            <Button
              fullWidth
              sx={{ mt: 5 }}
              onClick={resetTransactionAndCloseDialog}
            >
              {t('common.done')}
            </Button>
          )}
        </>
      )}
    </Dialog>
  );
};
