import { t } from '@ankr.com/common';
import { CircleCheck } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useSuccessBadgeStyles } from './useSuccessBadgeStyles';

export const SuccessBadge = () => {
  const { classes } = useSuccessBadgeStyles();

  return (
    <Typography className={classes.root} color="success" variant="body3">
      <CircleCheck className={classes.icon} />{' '}
      {t('account.account-details.ongoing-payments.status.success')}
    </Typography>
  );
};
