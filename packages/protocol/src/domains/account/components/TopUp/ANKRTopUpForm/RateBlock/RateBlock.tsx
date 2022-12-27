import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';

import { CurrencyType } from './RateBlockTypes';
import { getRate } from './RateBlockUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useRateBlockStyles } from './RateBlockStyles';
import { useRates } from 'domains/account/hooks/useRates';

interface RateBlockProps {
  currency: CurrencyType;
  value: string;
}

export const RateBlock = ({ value, currency }: RateBlockProps) => {
  const classes = useRateBlockStyles();

  const { rates = [], isRateLoading, handleFetchRates } = useRates();

  useOnMount(() => {
    handleFetchRates();
  });

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
