import { InlineAlert } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useInsufficientBalanceAlertStyles } from './useInsufficientBalanceAlertStyles';

const textKey =
  'account.payment-summary-dialog.crypto.insufficient-balance-warning';

export const InsufficientBalanceAlert = () => {
  const { classes } = useInsufficientBalanceAlertStyles();

  return (
    <InlineAlert severity="warning">
      <Typography className={classes.text} variant="body3">
        {t(textKey)}
      </Typography>
    </InlineAlert>
  );
};
