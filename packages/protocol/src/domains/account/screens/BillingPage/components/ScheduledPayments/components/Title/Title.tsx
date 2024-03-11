import { CreditCard } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useTitleStyles } from './TitleStyles';

export interface TitleProps {
  nextPaymentDate: string;
}

export const Title = ({ nextPaymentDate }: TitleProps) => {
  const { classes } = useTitleStyles();

  return (
    <div className={classes.root}>
      <CreditCard className={classes.icon} />
      <Typography className={classes.label}>
        {t('account.account-details.scheduled-payments.title', nextPaymentDate)}
      </Typography>
    </div>
  );
};
