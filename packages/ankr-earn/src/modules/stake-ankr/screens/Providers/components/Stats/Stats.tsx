import { Box, Paper, Typography } from '@material-ui/core';

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
        amountSlot={
          <Typography variant="h3">
            {t('stake-ankr.provider.percent-value', { value: highestAPY })}
          </Typography>
        }
        title={t('stake-ankr.provider.cur-highest-apy')}
        tooltip="tooltip"
      />

      <StatsItem
        amountSlot={
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Box mr={1}>
              <Typography variant="h3">{tvl}</Typography>
            </Box>

            <Typography color="textSecondary" variant="h3">
              {t('stake-ankr.provider.percent-value', { value: tvlPercent })}
            </Typography>
          </Box>
        }
        title={t('stake-ankr.provider.tvl')}
        tooltip="tooltip"
      />

      <StatsItem
        amountSlot={
          <Typography variant="h3">
            {t('stake-ankr.provider.days-value', { value: lockingPeriod })}
          </Typography>
        }
        title={t('stake-ankr.provider.locking-period')}
        tooltip="tooltip"
      />

      <StatsItem
        amountSlot={<Typography variant="h3">{rewards24h}</Typography>}
        title={t('stake-ankr.provider.24h-rewards')}
        tooltip="tooltip"
      />

      <StatsItem
        amountSlot={<Typography variant="h3">{rewards30d}</Typography>}
        title={t('stake-ankr.provider.30d-rewards')}
        tooltip="tooltip"
      />
    </Paper>
  );
};
