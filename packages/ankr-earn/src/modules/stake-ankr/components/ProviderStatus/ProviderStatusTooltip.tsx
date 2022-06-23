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
  successRate = 0,
  latency = 0,
  currentPeriod = 0,
  totalPeriod = 0,
  status,
}: IProviderStatusTooltipProps): JSX.Element => {
  const classes = useProviderStatusStyles();

  if (status === EProviderStatus.bonding) {
    return (
      <>
        {tHTML('stake-ankr.provider.status.bonding', {
          current: currentPeriod,
          total: totalPeriod,
        })}
      </>
    );
  }

  const successRateStatus = getStatusByPercent(successRate);
  const LatencyRateStatus = getStatusByPercent(latency);

  return (
    <dl className={classes.statsTooltip}>
      <dt className={classes.statsTitle}>{t('Success Rate')}</dt>

      <dd
        className={classNames(classes.statsDescr, {
          [classes.green]: successRateStatus === EProviderStatus.good,
          [classes.red]: successRateStatus === EProviderStatus.bad,
        })}
      >
        {t('unit.percentage-value', { value: Math.round(successRate) })}
      </dd>

      <dt className={classes.statsTitle}>{t('Latency')}</dt>

      <dd
        className={classNames(classes.statsDescr, {
          [classes.green]: LatencyRateStatus === EProviderStatus.good,
          [classes.red]: LatencyRateStatus === EProviderStatus.bad,
        })}
      >
        {t('unit.percentage-value', { value: Math.round(latency) })}
      </dd>
    </dl>
  );
};

function getStatusByPercent(percent = 0): EProviderStatus {
  if (percent < BAD_STATUS_RANGE) {
    return EProviderStatus.bad;
  }

  return EProviderStatus.good;
}
