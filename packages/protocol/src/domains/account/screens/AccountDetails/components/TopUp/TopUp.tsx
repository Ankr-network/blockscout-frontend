import React from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';
import { TopUpTabs } from './TopUpTabs';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { TopUpSkeleton } from './TopUpSkeleton';

export interface TopUpProps {
  className?: string;
}

export const TopUp = ({ className }: TopUpProps) => {
  const classes = useStyles();

  const { handleCanPayByCard, isCardPaymentEligible, isCanPayByCardLoading } =
    useCardPayment();

  useOnMount(() => {
    handleCanPayByCard();
  });

  return (
    <Box className={classNames(classes.root, className)}>
      <TopUpBlockHeader />
      {isCanPayByCardLoading ? (
        <TopUpSkeleton />
      ) : (
        <TopUpTabs canPayByCard={isCardPaymentEligible} />
      )}
    </Box>
  );
};
