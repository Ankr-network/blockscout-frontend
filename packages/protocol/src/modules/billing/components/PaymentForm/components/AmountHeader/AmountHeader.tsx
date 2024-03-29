import { Link, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { PRICES_PER_REQUEST_URL } from 'modules/billing/const';

import { useAmountHeaderStyles } from './useAmountHeaderStyles';

export const AmountHeader = () => {
  const { classes } = useAmountHeaderStyles();

  return (
    <div className={classes.amountHeaderRoot}>
      <Typography className={classes.title} variant="subtitle2">
        {t('account.payment-form.amount-title')}
      </Typography>
      <Link
        className={classes.link}
        color="primary"
        href={PRICES_PER_REQUEST_URL}
        target="_blank"
        underline="none"
        variant="body3"
      >
        {t('account.payment-form.how-we-calculate-link')}
      </Link>
    </div>
  );
};
