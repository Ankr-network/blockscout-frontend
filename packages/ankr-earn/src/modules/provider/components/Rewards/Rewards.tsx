import { t } from '@ankr.com/common';
import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { useIsSMUp } from 'ui';

import { Balance } from '../Balance';
import { BalancesCard } from '../BalancesCard';

import { useRewardsStyles } from './useRewardsStyles';

interface IRewardsProps {
  amount?: BigNumber;
  usdAmount?: BigNumber;
}

export const Rewards = ({ amount, usdAmount }: IRewardsProps): JSX.Element => {
  const classes = useRewardsStyles();
  const isSmUp = useIsSMUp();

  const renderedInfo = (
    <Typography className={classes.info} variant="body2">
      {t('provider-info.rewards-info')}
    </Typography>
  );

  return (
    <BalancesCard title={t('provider-info.rewards')}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Balance
            amount={amount}
            token={t('unit.eth')}
            usdAmount={usdAmount}
          />
        </Grid>

        {isSmUp && (
          <Grid item xs>
            {renderedInfo}
          </Grid>
        )}
      </Grid>

      {!isSmUp && renderedInfo}
    </BalancesCard>
  );
};
