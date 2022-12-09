import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { t, tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import ANKRIcon from './assets/ankr.svg';
import { useRates } from 'domains/account/hooks/useRates';
import { getRequests } from '../RateBlock/RateBlockUtils';
import { useRequestsBlockStyles } from './useRequestsBlockStyles';
import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';

interface RequestsBlockProps {
  value: string;
}

export const RequestsBlock = ({ value }: RequestsBlockProps) => {
  const classes = useRequestsBlockStyles();

  const { rates, isRateLoading } = useRates();

  const requests = useMemo(() => getRequests(rates, value), [rates, value]);

  const renderContent = useMemo(() => {
    if (isRateLoading) {
      return <Skeleton className={classes.skeleton} />;
    }

    const isAmountEmpty = !value || !Number(value);

    const amount = isAmountEmpty
      ? DEFAULT_ANKR_VALUE_STRING
      : new BigNumber(value).toFormat();

    return tHTML(`plan.premium-block.pricing`, {
      src: ANKRIcon,
      alt: t('plan.premium-block.ankr'),
      amount,
      requests: t('plan.premium-block.value', { requests }),
    });
  }, [isRateLoading, classes.skeleton, requests, value]);

  return (
    <Typography className={classes.pricing} variant="body2">
      {renderContent}
    </Typography>
  );
};
