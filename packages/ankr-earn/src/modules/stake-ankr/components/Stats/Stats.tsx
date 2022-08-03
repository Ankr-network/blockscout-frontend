import { t } from 'common';

import { BigNumberish } from 'modules/common/utils/numbers/converters';

import { StatsBox } from './StatsBox';
import { StatsItem } from './StatsItem';
import { useStats } from './useStats';

interface IStatsProps {
  amount: BigNumberish;
}

export const Stats = ({ amount }: IStatsProps): JSX.Element => {
  const {
    apy,
    yearlyEarning,
    yearlyEarningUSD,
    totalStaked,
    totalStakedUSD,
    stakers,
  } = useStats({
    amount,
  });

  return (
    <StatsBox>
      <StatsItem
        label={t('stake-ankr.staking.stats.apy')}
        tooltip={t('stake-ankr.staking.stats.apy-tooltip')}
        value={apy}
      />

      <StatsItem
        label={t('stake-ankr.staking.stats.yearly-earning')}
        token={t(`unit.ankr`)}
        usdEquivalent={yearlyEarningUSD}
        value={yearlyEarning}
      />

      {totalStaked && (
        <StatsItem
          label={t('stake-ankr.staking.stats.tvl')}
          token={t(`unit.ankr`)}
          usdEquivalent={totalStakedUSD}
          value={totalStaked}
        />
      )}

      {stakers && (
        <StatsItem
          label={t('stake-ankr.staking.stats.stakers')}
          value={stakers}
        />
      )}
    </StatsBox>
  );
};
