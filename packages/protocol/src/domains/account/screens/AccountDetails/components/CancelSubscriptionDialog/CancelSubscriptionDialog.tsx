import { Button, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';

import { useCancelSubscriptionDialogStyles } from './CancelSubscriptionDialogStyles';

export interface CancelSubscriptionDialogProps {
  isContinuing: boolean;
  onClose: () => void;
  onContinue?: () => void;
  open: boolean;
}

export const CancelSubscriptionDialog = ({
  onClose,
  onContinue,
  open,
  isContinuing,
}: CancelSubscriptionDialogProps) => {
  const { classes } = useCancelSubscriptionDialogStyles();

  return (
    <Dialog
      maxPxWidth={618}
      onClose={onClose}
      open={open}
      title={t('account.account-details.subscriptions.are-you-sure')}
      titleClassName={classes.title}
    >
      <div className={classes.root}>
        <Typography className={classes.description}>
          {t('account.account-details.subscriptions.if-you-continue')}
        </Typography>
        <div className={classes.buttons}>
          <LoadingButton
            loading={isContinuing}
            onClick={onContinue}
            variant="outlined"
          >
            {t('account.account-details.subscriptions.cancel-subscription')}
          </LoadingButton>
          <Button onClick={onClose}>
            {t('account.account-details.subscriptions.keep-subscription')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
