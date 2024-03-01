import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { PRICING_PATH } from 'domains/pricing/Routes';

import { usePlansButtonStyles } from './PlansButtonStyles';

const href = `/rpc${PRICING_PATH}`;

export const PlansButton = () => {
  const { classes } = usePlansButtonStyles();

  return (
    <Button className={classes.root} variant="text" href={href} target="_blank">
      {t('account.account-details.all-plans-button')}
    </Button>
  );
};
