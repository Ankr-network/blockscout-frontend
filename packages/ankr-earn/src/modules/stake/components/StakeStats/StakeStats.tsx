import { t } from '@ankr.com/common';
import { Paper } from '@material-ui/core';

import { DuneAnalyticsLink } from 'modules/common/components/DuneAnalyticsLink/DuneAnalyticsLink';
import { featuresConfig } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { StakeStatsBox } from './StakeStatsBox';
import { StakeStatsItem } from './StakeStatsItem';
import { useStakeStats } from './useStakeStats';

interface IStatsProps {
  amount: BigNumberish;
  metricsServiceName: EMetricsServiceName;
  analyticsLink?: string;
}

export const StakeStats = ({
  amount,
  metricsServiceName,
  analyticsLink,
}: IStatsProps): JSX.Element => {
  const {
    apy,
    yearlyEarning,
    yearlyEarningUSD,
    totalStaked,
    totalStakedUSD,
    stakers,
  } = useStakeStats({
    amount,
    metricsServiceName,
  });

  return (
    <Paper>
      <StakeStatsBox>
        <StakeStatsItem
          label={t('stake.stats.apy')}
          tooltip={t('stake.stats.apy-tooltip')}
          value={apy}
        />

        <StakeStatsItem
          label={t('stake.stats.yearly-earning')}
          token={t(`unit.${metricsServiceName}`)}
          usdEquivalent={yearlyEarningUSD}
          value={yearlyEarning}
        />

        {totalStaked && (
          <StakeStatsItem
            label={t('stake.stats.staked')}
            token={t(`unit.${metricsServiceName}`)}
            usdEquivalent={totalStakedUSD}
            value={totalStaked}
          />
        )}

        {stakers && (
          <StakeStatsItem label={t('stake.stats.stakers')} value={stakers} />
        )}
      </StakeStatsBox>

      {featuresConfig.duneAnalyticsLink && analyticsLink && (
        <DuneAnalyticsLink link={analyticsLink} />
      )}
    </Paper>
  );
};
