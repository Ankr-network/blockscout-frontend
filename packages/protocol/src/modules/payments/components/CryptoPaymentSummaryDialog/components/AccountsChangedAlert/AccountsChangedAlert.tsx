import { InlineAlert } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useAccountsChangedAlertStyles } from './useAccountsChangedAlertStyles';

const textKey =
  'account.payment-summary-dialog.crypto.accounts-changed-warning';

export const AccountsChangedAlert = () => {
  const { classes } = useAccountsChangedAlertStyles();

  return (
    <InlineAlert severity="warning">
      <Typography className={classes.text} variant="body3">
        {t(textKey)}
      </Typography>
    </InlineAlert>
  );
};
