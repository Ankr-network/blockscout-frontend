import { t } from 'common';

import { StatsBox } from './StatsBox';
import { StatsItem } from './StatsItem';

interface IStatsProps {
  apyText: string;
  yearlyEarning: string;
  yearlyEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: string;
  token: string;
  isLoading: boolean;
}

export const Stats = ({
  apyText,
  yearlyEarning,
  yearlyEarningUSD,
  totalStaked,
  totalStakedUSD,
  stakers,
  token,
  isLoading,
}: IStatsProps): JSX.Element => {
  return (
    <StatsBox>
      <StatsItem
        isLoading={isLoading}
        label={t('delegated-stake.staking.stats.apy')}
        tooltip={t('delegated-stake.staking.stats.apy-tooltip')}
        value={apyText}
      />

      <StatsItem
        isLoading={isLoading}
        label={t('delegated-stake.staking.stats.yearly-earning')}
        token={token}
        usdEquivalent={yearlyEarningUSD}
        value={yearlyEarning}
      />

      {totalStaked && (
        <StatsItem
          isLoading={isLoading}
          label={t('delegated-stake.staking.stats.tvl')}
          token={token}
          usdEquivalent={totalStakedUSD}
          value={totalStaked}
        />
      )}

      {stakers && (
        <StatsItem
          isLoading={isLoading}
          label={t('delegated-stake.staking.stats.stakers')}
          value={stakers}
        />
      )}
    </StatsBox>
  );
};
