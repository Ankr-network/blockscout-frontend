import classNames from 'classnames';

import { t, tHTML } from 'common';

import { Days, Percentage } from 'modules/common/types';
import { BAD_STATUS_RANGE, EProviderStatus } from 'modules/stake-ankr/const';

import { useProviderStatusStyles } from './useProviderStatusStyles';

interface IProviderStatusTooltipProps {
  successRate?: Percentage;
  latency?: Percentage;
  currentPeriod?: Days;
  totalPeriod?: Days;
  status: EProviderStatus;
}

export const ProviderStatusTooltip = ({
  successRate,
  latency,
  currentPeriod,
  totalPeriod,
  status,
}: IProviderStatusTooltipProps): JSX.Element | null => {
  const classes = useProviderStatusStyles();

  const hasCurrentPeriod = typeof currentPeriod !== 'undefined';
  const hasTotaltPeriod = typeof totalPeriod !== 'undefined';

  if (
    status === EProviderStatus.pending &&
    hasCurrentPeriod &&
    hasTotaltPeriod
  ) {
    return (
      <>
        {tHTML('stake-ankr.provider.status.bonding', {
          current: currentPeriod,
          total: totalPeriod,
        })}
      </>
    );
  }

  const hasSuccessRate = typeof successRate !== 'undefined';
  const hasLatency = typeof latency !== 'undefined';
  const successRateStatus = getStatusByPercent(successRate);
  const LatencyRateStatus = getStatusByPercent(latency);

  return (
    <dl className={classes.statsTooltip}>
      {hasSuccessRate && (
        <>
          <dt className={classes.statsTitle}>
            {t('stake-ankr.provider.status.success-rate')}
          </dt>

          <dd
            className={classNames(classes.statsDescr, {
              [classes.green]: successRateStatus === EProviderStatus.active,
              [classes.red]: successRateStatus === EProviderStatus.notFound,
            })}
          >
            {t('unit.percentage-value', { value: Math.round(successRate) })}
          </dd>
        </>
      )}

      {hasLatency && (
        <>
          <dt className={classes.statsTitle}>
            {t('stake-ankr.provider.status.latency')}
          </dt>

          <dd
            className={classNames(classes.statsDescr, {
              [classes.green]: LatencyRateStatus === EProviderStatus.active,
              [classes.red]: LatencyRateStatus === EProviderStatus.notFound,
            })}
          >
            {t('unit.percentage-value', { value: Math.round(latency) })}
          </dd>
        </>
      )}
    </dl>
  );
};

function getStatusByPercent(percent = 0): EProviderStatus {
  if (percent < BAD_STATUS_RANGE) {
    return EProviderStatus.notFound;
  }

  return EProviderStatus.active;
}
