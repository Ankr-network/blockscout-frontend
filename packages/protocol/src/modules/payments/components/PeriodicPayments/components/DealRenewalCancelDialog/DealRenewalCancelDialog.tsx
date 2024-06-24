import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';

import { renderDescription } from './utils/renderDescription';
import { renderTitle } from './utils/renderTitle';

export interface IDealRenewalCancelDialogProps {
  expiresAt?: string;
  isDeal: boolean;
  isOpened?: boolean;
  isPackage: boolean;
  onClose: () => void;
}

export const DealRenewalCancelDialog = ({
  expiresAt,
  isDeal,
  isOpened = false,
  isPackage,
  onClose,
}: IDealRenewalCancelDialogProps) => {
  return (
    <Dialog onClose={onClose} open={isOpened} maxPxWidth={520}>
      <Typography variant="h6" align="center" mb={3}>
        {renderTitle({ isDeal, isPackage })}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        component="p"
        mb={8}
        color="textSecondary"
      >
        {renderDescription({ expiresAt, isDeal, isPackage })}
      </Typography>
      <Button onClick={onClose} fullWidth>
        {t('account.deal-renewal.cancel-dialog.done-btn')}
      </Button>
    </Dialog>
  );
};
