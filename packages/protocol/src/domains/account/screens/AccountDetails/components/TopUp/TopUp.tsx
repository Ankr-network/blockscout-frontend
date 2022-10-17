import { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';
import { TopUpTabs } from './TopUpTabs';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { useRates } from 'domains/account/hooks/useRates';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { TopUpSkeleton } from './TopUpSkeleton';

export interface TopUpProps {
  className?: string;
  header?: ReactNode;
}

export const TopUp = ({
  className,
  header = <TopUpBlockHeader />,
}: TopUpProps) => {
  const classes = useStyles();

  const { handleCanPayByCard, isCardPaymentEligible, isCanPayByCardLoading } =
    useCardPayment();

  const { handleFetchRates } = useRates();

  useOnMount(() => {
    handleCanPayByCard();
    handleFetchRates();
  });

  return (
    <Box className={classNames(classes.root, className)}>
      {header}
      {isCanPayByCardLoading ? (
        <TopUpSkeleton />
      ) : (
        <TopUpTabs canPayByCard={isCardPaymentEligible} />
      )}
    </Box>
  );
};
