import { Paper } from '@material-ui/core';

import { t, tHTML } from 'common';

import { StatsItem } from './StatsItem';
import { useStatsStyles } from './useStatsStyles';

interface IProviderStatsData {
  highestAPY: string;
  tvl: string;
  lockingPeriod: number;
  rewards24h?: string;
  rewards30d?: string;
}

export const ProviderStats = ({
  highestAPY,
  tvl,
  lockingPeriod,
  rewards24h,
  rewards30d,
}: IProviderStatsData): JSX.Element => {
  const classes = useStatsStyles();

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      <StatsItem
        primaryValue={t('stake-ankr.provider.percent-value', {
          value: highestAPY,
        })}
        title={t('stake-ankr.provider.cur-highest-apy')}
        tooltip={t('stake-ankr.provider.cur-highest-apy-tooltip')}
      />

      <StatsItem
        primaryValue={tvl}
        title={t('stake-ankr.provider.tvl')}
        tooltip={t('stake-ankr.provider.tvl-tooltip')}
      />

      <StatsItem
        primaryValue={t('stake-ankr.provider.days-value', {
          value: lockingPeriod,
        })}
        title={t('stake-ankr.provider.locking-period')}
        tooltip={tHTML('stake-ankr.provider.locking-period-tooltip')}
      />

      {rewards24h && (
        <StatsItem
          primaryValue={rewards24h}
          title={t('stake-ankr.provider.24h-rewards')}
          tooltip={t('stake-ankr.provider.24h-rewards-tooltip')}
        />
      )}

      {rewards30d && (
        <StatsItem
          primaryValue={rewards30d}
          title={t('stake-ankr.provider.30d-rewards')}
          tooltip={t('stake-ankr.provider.30d-rewards-tooltip')}
        />
      )}
    </Paper>
  );
};
