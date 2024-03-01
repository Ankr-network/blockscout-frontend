import { CreditCard } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useTitleStyles } from './TitleStyles';

export interface TitleProps {
  paymentsCount: number;
}

const intlKey = 'account.account-details.scheduled-payments.title';

export const Title = ({ paymentsCount }: TitleProps) => {
  const { classes } = useTitleStyles();

  return (
    <div className={classes.root}>
      <CreditCard className={classes.icon} />
      <Typography className={classes.label}>
        {t(intlKey, { paymentsCount })}
      </Typography>
    </div>
  );
};
