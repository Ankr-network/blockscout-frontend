import { OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useWaitingBadgeStyles } from './useWaitingBadgeStyles';

export const WaitingBadge = () => {
  const { classes } = useWaitingBadgeStyles();

  return (
    <Typography className={classes.root} color="textSecondary" variant="body3">
      <OverlaySpinner size={14} className={classes.icon} />{' '}
      {t('account.account-details.ongoing-payments.status.waiting')}
    </Typography>
  );
};
