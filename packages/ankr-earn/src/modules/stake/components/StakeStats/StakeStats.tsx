import { t } from 'common';

import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { StakeStatsBox } from './StakeStatsBox';
import { StakeStatsItem } from './StakeStatsItem';
import { useStakeStats } from './useStakeStats';

interface IStatsProps {
  amount: BigNumberish;
  metricsServiceName: EMetricsServiceName;
}

export const StakeStats = ({
  amount,
  metricsServiceName,
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
  );
};
