import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';

interface IDealRenewalCancelDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  expiresAt: string;
}

export const DealRenewalCancelDialog = ({
  isOpened = false,
  onClose,
  expiresAt,
}: IDealRenewalCancelDialogProps) => {
  return (
    <Dialog onClose={onClose} open={isOpened} maxPxWidth={520}>
      <Typography variant="h6" align="center" mb={3}>
        {t('account.deal-renewal.cancel-dialog.title')}
      </Typography>

      <Typography
        variant="body2"
        align="center"
        component="p"
        mb={8}
        color="textSecondary"
      >
        {t('account.deal-renewal.cancel-dialog.description', {
          date: expiresAt,
        })}
      </Typography>

      <Button onClick={onClose} fullWidth>
        {t('account.deal-renewal.cancel-dialog.done-btn')}
      </Button>
    </Dialog>
  );
};
