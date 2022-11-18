import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';

import ANKRIcon from './assets/ankr.svg';
import { useRates } from 'domains/account/hooks/useRates';
import { ANKR_CURRENCY, CurrencyType } from '../../../const';
import { DEFAULT_ANKR_AMOUNT, getRequests } from '../RateBlock/RateBlockUtils';
import { useRequestsBlockStyles } from './useRequestsBlockStyles';
import { t, tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

interface RateBlockProps {
  currency?: CurrencyType;
  value: string;
}

export const RequestsBlock = ({
  value,
  currency = ANKR_CURRENCY,
}: RateBlockProps) => {
  const classes = useRequestsBlockStyles();

  const { rates, isRateLoading } = useRates();

  const requests = useMemo(
    () => getRequests(currency, rates, value),
    [rates, currency, value],
  );

  return (
    <Typography className={classes.pricing} variant="body2">
      {isRateLoading ? (
        <Skeleton className={classes.skeleton} />
      ) : (
        tHTML(`plan.premium-block.pricing`, {
          src: ANKRIcon,
          alt: t('plan.premium-block.ankr'),
          amount:
            !value || !Number(value)
              ? DEFAULT_ANKR_AMOUNT
              : new BigNumber(value).toFormat(),
          requests: t('plan.premium-block.value', { requests }),
        })
      )}
    </Typography>
  );
};
