import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';

import { useRates } from 'domains/account/hooks/useRates';
import { useRateBlockStyles } from './RateBlockStyles';
import { getRate } from './RateBlockUtils';
import { CurrencyType } from './RateBlockTypes';

interface RateBlockProps {
  currency: CurrencyType;
  value: string;
}

export const RateBlock = ({ value, currency }: RateBlockProps) => {
  const classes = useRateBlockStyles();

  const { rates, isRateLoading } = useRates();

  const rateContent = useMemo(
    () => getRate(currency, rates, value),
    [rates, currency, value],
  );

  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      align="center"
      className={classes.rate}
      noWrap
    >
      {isRateLoading ? <Skeleton className={classes.skeleton} /> : rateContent}
    </Typography>
  );
};
