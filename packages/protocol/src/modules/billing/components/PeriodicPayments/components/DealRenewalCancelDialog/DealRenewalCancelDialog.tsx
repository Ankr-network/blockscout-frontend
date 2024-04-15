import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Dialog } from 'uiKit/Dialog';

interface IDealRenewalCancelDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  expiresAt?: string;
  isDeal?: boolean;
}

export const DealRenewalCancelDialog = ({
  isOpened = false,
  onClose,
  expiresAt,
  isDeal,
}: IDealRenewalCancelDialogProps) => {
  const renderDescription = useMemo(() => {
    if (!isDeal) {
      return t('account.periodic-payments.cancel-dialog.description');
    }

    if (expiresAt) {
      return t('account.deal-renewal.cancel-dialog.description-with-date', {
        date: expiresAt,
      });
    }

    return t('account.deal-renewal.cancel-dialog.description-common');
  }, [expiresAt, isDeal]);

  return (
    <Dialog onClose={onClose} open={isOpened} maxPxWidth={520}>
      <Typography variant="h6" align="center" mb={3}>
        {isDeal
          ? t('account.deal-renewal.cancel-dialog.title')
          : t('account.periodic-payments.cancel-dialog.title')}
      </Typography>

      <Typography
        variant="body2"
        align="center"
        component="p"
        mb={8}
        color="textSecondary"
      >
        {renderDescription}
      </Typography>

      <Button onClick={onClose} fullWidth>
        {t('account.deal-renewal.cancel-dialog.done-btn')}
      </Button>
    </Dialog>
  );
};
