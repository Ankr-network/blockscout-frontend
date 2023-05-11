import { t } from '@ankr.com/common';
import { Skeleton } from '@mui/material';

import { TopUpCurrency } from '../../types';
import { useRateStyles } from './RateStyles';

export interface RateProps {
  amount: string;
  credits: number;
  currency: TopUpCurrency;
  isRateLoading: boolean;
}

export const Rate = ({
  amount,
  credits,
  currency,
  isRateLoading,
}: RateProps) => {
  const { classes } = useRateStyles();

  if (isRateLoading) {
    return <Skeleton className={classes.skeleton} />;
  }

  return (
    <div className={classes.root}>
      {t('account.account-details.top-up.credits-rate', {
        symbol: currency === TopUpCurrency.USD ? '$' : '',
        amount,
        credits,
        currency,
      })}
    </div>
  );
};
