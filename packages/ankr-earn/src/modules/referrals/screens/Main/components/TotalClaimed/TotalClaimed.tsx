import { Divider, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { uid } from 'react-uid';

import { t } from 'common';

import { BaseAmount } from 'modules/referrals/components/BaseAmount';

import { useClaimHistory } from '../../hooks/useClaimHistory';

import { useTotalClaimedStyles } from './useTotalClaimedStyles';

export const TotalClaimed = (): JSX.Element | null => {
  const classes = useTotalClaimedStyles();

  const { totalClaimed, isLoading } = useClaimHistory();

  if (!totalClaimed?.length && !isLoading) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} color="textSecondary">
        {t('referrals.claim-history.total-claimed')}
      </Typography>

      <Divider />

      {isLoading && <Skeleton height={56} width={200} />}

      {!isLoading && (
        <div className={classes.wrapper}>
          {totalClaimed?.map((tokenItem, i) => (
            <div className={classes.amount}>
              <BaseAmount
                key={uid(i)}
                withTokenIcon
                amount={tokenItem.amount}
                token={tokenItem.token}
                usdAmount={tokenItem.amountUsd}
              />
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};
