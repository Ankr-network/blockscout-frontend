import { Stripe } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useStripeWordmarkStyles } from './useStripeWordmarkStyles';

export const StripeWordmark = () => {
  const { classes } = useStripeWordmarkStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="body4">
        {t('account.stripe-wordmark.label')}
      </Typography>
      <Stripe className={classes.logo} />
    </div>
  );
};
