import { Mark } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useErrorBadgeStyles } from './useErrorBadgeStyles';

export const ErrorBadge = () => {
  const { classes } = useErrorBadgeStyles();

  return (
    <Typography className={classes.root} color="error" variant="body3">
      <Mark className={classes.icon} />{' '}
      {t('account.account-details.ongoing-payments.status.error')}
    </Typography>
  );
};
