import { Box, Button, Typography } from '@mui/material';
import { RecurrentInterval } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import {
  ConfirmCancellationDialog,
  useConfirmCancelDialog,
} from 'modules/billing/components/PeriodicPayments/components/ConfirmCancellationDialog';

import { NextBillingDate } from '../NextBillingDate';
import { Price } from '../Price';
import { useSubscriptionEditorStyles } from './SubscriptionEditorStyles';
import { LastPackageWarning } from '../LastPackageWarning';

export interface SubscriptionEditorProps {
  amount: string;
  isCanceling: boolean;
  nextBillingDate: string;
  onCancel: () => Promise<void>;
  onOpenSuccessDialog: () => void;
  period: RecurrentInterval;
  customChargingModelName?: string;
  isDeprecatedModel?: boolean;
}

export const SubscriptionEditor = ({
  amount,
  isCanceling,
  nextBillingDate,
  onCancel,
  period,
  onOpenSuccessDialog,
  customChargingModelName,
  isDeprecatedModel,
}: SubscriptionEditorProps) => {
  const {
    isOpened: isOpenedConfirmDialog,
    onOpen: onOpenConfirmDialog,
    onClose: onCloseConfirmDialog,
    dialogTitle,
    dialogDescription,
  } = useConfirmCancelDialog({
    nextPaymentDate: nextBillingDate,
    customChargingModelName,
    recurringAmount: amount,
  });

  const onContinue = useCallback(async () => {
    await onCancel();

    onOpenSuccessDialog();
    onCloseConfirmDialog();
  }, [onCancel, onCloseConfirmDialog, onOpenSuccessDialog]);

  const { classes } = useSubscriptionEditorStyles();

  return (
    <Box className={classes.root}>
      <Price
        amount={amount}
        className={classes.price}
        period={period}
        title={
          <Typography component="p" variant="subtitle1" color="primary">
            {customChargingModelName ||
              t(
                'account.account-details.edit-subscriptions-dialog.recurring-payment',
              )}
          </Typography>
        }
      />

      <NextBillingDate
        date={nextBillingDate}
        isDeprecatedModel={isDeprecatedModel}
      />

      {isDeprecatedModel ? (
        <LastPackageWarning />
      ) : (
        <div className={classes.controls}>
          <Button
            className={classes.cancelButton}
            fullWidth
            onClick={onOpenConfirmDialog}
            variant="outlined"
          >
            {t('account.account-details.subscription-editor.cancel-button')}
          </Button>
        </div>
      )}

      <ConfirmCancellationDialog
        onClose={onCloseConfirmDialog}
        isOpened={isOpenedConfirmDialog}
        isLoading={isCanceling}
        title={dialogTitle}
        description={dialogDescription}
        onConfirm={onContinue}
      />
    </Box>
  );
};
