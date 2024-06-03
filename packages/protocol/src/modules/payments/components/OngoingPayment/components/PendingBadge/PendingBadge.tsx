import { OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { usePendingBadgeStyles } from './usePendingBadgeStyles';

export const PendingBadge = () => {
  const { classes } = usePendingBadgeStyles();

  return (
    <Typography className={classes.root} color="textSecondary" variant="body3">
      <OverlaySpinner size={14} className={classes.icon} />{' '}
      {t('account.account-details.ongoing-payments.status.pending')}
    </Typography>
  );
};
