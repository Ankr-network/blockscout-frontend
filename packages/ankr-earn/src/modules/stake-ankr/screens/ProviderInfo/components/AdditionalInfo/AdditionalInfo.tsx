import { Paper } from '@material-ui/core';

import { t } from 'common';

import { useStatsData } from '../../hooks/useStatsData';

import { AdditionalInfoItem, EStatus } from './AdditionalInfoItem';
import { useAdditionalInfoStyles } from './useAdditionalInfoStyles';

export const AdditionalInfo = (): JSX.Element => {
  const classes = useAdditionalInfoStyles();

  const {
    data: { successRate, latency, uptime },
  } = useStatsData();

  return (
    <Paper className={classes.infoWrapper} variant="elevation">
      <AdditionalInfoItem
        label={t('stake-ankr.provider-info.provider-stats.success-rate')}
        status={EStatus.Bad}
        value={t('unit.percentage-value', { value: successRate })}
      />

      <AdditionalInfoItem
        label={t('stake-ankr.provider-info.provider-stats.latency')}
        status={EStatus.Ok}
        value={t('unit.milliseconds-value', { value: latency })}
      />

      <AdditionalInfoItem
        label={t('stake-ankr.provider-info.provider-stats.uptime')}
        status={EStatus.Ok}
        value={t('unit.percentage-value', { value: uptime })}
      />
    </Paper>
  );
};
