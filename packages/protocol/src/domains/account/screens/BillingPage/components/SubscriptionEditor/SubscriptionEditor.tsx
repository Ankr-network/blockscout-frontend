import { Box, Button } from '@mui/material';
import { RecurrentInterval } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { CancelSubscriptionDialog } from '../CancelSubscriptionDialog';
import { NextBillingDate } from '../NextBillingDate';
import { Price } from '../Price';
import { useSubscriptionEditorStyles } from './SubscriptionEditorStyles';

export interface SubscriptionEditorProps {
  amount: string;
  isCanceling: boolean;
  nextBillingDate: string;
  onCancel: () => Promise<void>;
  onUpgrade?: () => void;
  period: RecurrentInterval;
}

export const SubscriptionEditor = ({
  amount,
  isCanceling,
  nextBillingDate,
  onCancel,
  onUpgrade,
  period,
}: SubscriptionEditorProps) => {
  const { isOpened, onClose, onOpen } = useDialog();

  const onContinue = useCallback(async () => {
    await onCancel();

    onClose();
  }, [onCancel, onClose]);

  const { classes } = useSubscriptionEditorStyles();

  return (
    <Box className={classes.root}>
      <Price amount={amount} className={classes.price} period={period} />
      <NextBillingDate date={nextBillingDate} />
      <div className={classes.controls}>
        <Button
          className={classes.upgradeButton}
          fullWidth
          onClick={onUpgrade}
          variant="contained"
        >
          {t('account.account-details.subscription-editor.upgrade-button')}
        </Button>
        <Button
          className={classes.cancelButton}
          fullWidth
          onClick={onOpen}
          variant="outlined"
        >
          {t('account.account-details.subscription-editor.cancel-button')}
        </Button>
        <div className={classes.warning}>
          {t('account.account-details.subscription-editor.warning')}
        </div>
      </div>
      <CancelSubscriptionDialog
        isContinuing={isCanceling}
        onClose={onClose}
        onContinue={onContinue}
        open={isOpened}
      />
    </Box>
  );
};
