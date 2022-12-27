import { Button, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Dialog } from 'uiKit/Dialog';
import { useCancelSubscriptionDialogStyles } from './useCancelSubscriptionDialogStyles';

export interface ICancelSubscriptionDialogProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export function CancelSubscriptionDialog({
  open,
  onSuccess,
  onClose,
}: ICancelSubscriptionDialogProps) {
  const classes = useCancelSubscriptionDialogStyles();

  return (
    <Dialog
      maxPxWidth={618}
      title={t('account.account-details.subscriptions.are-you-sure')}
      titleClassName={classes.dialogTitle}
      open={open}
      onClose={onClose}
    >
      <div className={classes.container}>
        <Typography className={classes.text} variant="h6">
          {t('account.account-details.subscriptions.if-you-continue')}
        </Typography>
        <div className={classes.buttons}>
          <Button variant="outlined" onClick={onSuccess}>
            {t('account.account-details.subscriptions.cancel-subscription')}
          </Button>
          <Button onClick={onClose}>
            {t('account.account-details.subscriptions.keep-subscription')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
