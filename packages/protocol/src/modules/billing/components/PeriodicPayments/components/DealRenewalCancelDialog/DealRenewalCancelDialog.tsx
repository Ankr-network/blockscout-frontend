import { t } from '@ankr.com/common';
import { Button, Dialog, Typography } from '@mui/material';

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
  <Dialog onClose={onClose} open={isOpened}>
    <Typography variant="h6">
      {t('account.deal-renewal.cancel-dialog.title')}
    </Typography>

    <Typography variant="body2">
      {t('account.deal-renewal.cancel-dialog.description', {
        date: expiresAt,
      })}
    </Typography>
    <Button onClick={onClose}>
      {t('account.deal-renewal.cancel-dialog.done-btn')}
    </Button>
  </Dialog>;
};
