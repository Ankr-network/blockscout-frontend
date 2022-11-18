import { t } from '@ankr.com/common';
import { Paper } from '@material-ui/core';

import { useStatsData } from '../../hooks/useStatsData';

import { StatsItem } from './StatsItem';
import { useStatsStyles } from './useStatsStyles';

export const Stats = (): JSX.Element => {
  const classes = useStatsStyles();

  const {
    data: {
      apy,
      stakedPool,
      stakedPoolPercent,
      nodes,
      sharedRevenue,
      onlineDays,
    },
  } = useStatsData();

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      <StatsItem
        primaryValue={t(
          'stake-ankr.provider-info.provider-stats.percent-value',
          {
            value: apy,
          },
        )}
        title={t('stake-ankr.provider-info.provider-stats.current-apr')}
      />

      <StatsItem
        primaryValue={stakedPool.toFormat()}
        secondaryValue={t(
          'stake-ankr.provider-info.provider-stats.percent-value',
          {
            value: stakedPoolPercent,
          },
        )}
        title={t('stake-ankr.provider-info.provider-stats.staked-pool')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={nodes}
        title={t('stake-ankr.provider-info.provider-stats.nodes')}
      />

      <StatsItem
        primaryValue={sharedRevenue.toFormat()}
        title={t('stake-ankr.provider-info.provider-stats.shared-revenue')}
        tooltip="tooltip"
      />

      <StatsItem
        primaryValue={
          onlineDays === 1
            ? t('stake-ankr.provider-info.provider-stats.online-day', {
                value: onlineDays,
              })
            : t('stake-ankr.provider-info.provider-stats.online-days', {
                value: onlineDays,
              })
        }
        title={t('stake-ankr.provider-info.provider-stats.online')}
      />
    </Paper>
  );
};
