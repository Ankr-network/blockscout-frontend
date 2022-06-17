import { Paper } from '@material-ui/core';

import { t } from 'common';

import { useStatsData } from '../../hooks/useStatsData';

import { StatsItem } from './StatsItem';
import { useStatsStyles } from './useStatsStyles';

export const Stats = (): JSX.Element => {
  const classes = useStatsStyles();

  const { highestAPY, tvl, tvlPercent, lockingPeriod, rewards24h, rewards30d } =
    useStatsData();

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      <StatsItem
        primaryValue={t('stake-ankr.provider.percent-value', {
          value: highestAPY,
        })}
        title={t('stake-ankr.provider.cur-highest-apy')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={tvl}
        secondaryValue={t('stake-ankr.provider.percent-value', {
          value: tvlPercent,
        })}
        title={t('stake-ankr.provider.tvl')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={t('stake-ankr.provider.days-value', {
          value: lockingPeriod,
        })}
        title={t('stake-ankr.provider.locking-period')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={rewards24h}
        title={t('stake-ankr.provider.24h-rewards')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={rewards30d}
        title={t('stake-ankr.provider.30d-rewards')}
        tooltip="tooltip"
      />
    </Paper>
  );
};
