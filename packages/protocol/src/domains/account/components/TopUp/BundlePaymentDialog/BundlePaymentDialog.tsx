import { List, ListItem, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { TrackTopUpSubmit } from 'domains/account/types';

import unlock from './assets/unlock-icon.png';
import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { intlRoot } from './const';
import { useBundlePayment } from './hooks/useBundlePayment';
import { useBundlePaymentDialogStyles } from './BundlePaymentDialogStyles';

export interface BundlePaymentDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  trackSubmit?: TrackTopUpSubmit;
}

export const BundlePaymentDialog = ({
  isOpened = false,
  onClose,
  trackSubmit,
}: BundlePaymentDialogProps) => {
  const { emailData, emailDialogProps, isLoading, subscribe } =
    useBundlePayment(trackSubmit);

  const { classes } = useBundlePaymentDialogStyles();

  return (
    <Dialog
      closeButtonClassName={classes.closeButton}
      onClose={onClose}
      open={isOpened}
      paperClassName={classes.root}
      title={<img alt="unlock" className={classes.unlockIcon} src={unlock} />}
      titleClassName={classes.dialogTitle}
    >
      <div className={classes.content}>
        <Typography className={classes.title} variant="h6">
          {t(`${intlRoot}.title`)}
        </Typography>
        <Typography
          className={classes.description}
          component="div"
          variant="body2"
        >
          {t(`${intlRoot}.description`)}
        </Typography>
        <List className={classes.features}>
          <ListItem className={classes.feature}>
            {tHTML(`${intlRoot}.requests`)}
          </ListItem>
          <ListItem className={classes.feature}>
            {t(`${intlRoot}.domains`)}
          </ListItem>
          <ListItem className={classes.feature}>
            {t(`${intlRoot}.addresses`)}
          </ListItem>
          <ListItem className={classes.feature}>
            {t(`${intlRoot}.management`)}
          </ListItem>
          <ListItem className={classes.feature}>
            {tHTML(`${intlRoot}.methods`)}
          </ListItem>
        </List>
        <LoadingButton
          className={classes.button}
          fullWidth
          loading={isLoading}
          onClick={subscribe}
        >
          {t(`${intlRoot}.button`)}
        </LoadingButton>
      </div>
      <TopUpEmailDialog
        dialogProps={emailDialogProps}
        emailDataProps={emailData}
      />
    </Dialog>
  );
};
