import { Paper } from '@material-ui/core';

import { t } from 'common';

import { DuneAnalyticsLink } from 'modules/common/components/DuneAnalyticsLink/DuneAnalyticsLink';
import { featuresConfig } from 'modules/common/const';

import { StatsBox } from './StatsBox';
import { StatsItem } from './StatsItem';

interface IStatsProps {
  apyText: string;
  annualEarning: string;
  annualEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: number;
  analyticsLink?: string;
  token: string;
  isLoading: boolean;
}

export const Stats = ({
  apyText,
  annualEarning: yearlyEarning,
  annualEarningUSD: yearlyEarningUSD,
  totalStaked,
  totalStakedUSD,
  stakers,
  analyticsLink,
  token,
  isLoading,
}: IStatsProps): JSX.Element => {
  return (
    <Paper>
      <StatsBox>
        <StatsItem
          isLoading={isLoading}
          label={t('delegated-stake.staking.stats.apr')}
          tooltip={t('delegated-stake.staking.stats.apr-tooltip')}
          value={apyText}
        />

        <StatsItem
          isLoading={isLoading}
          label={t('delegated-stake.staking.stats.annual-earning')}
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

        {!!stakers && stakers > 0 && (
          <StatsItem
            isLoading={isLoading}
            label={t('delegated-stake.staking.stats.stakers')}
            value={stakers}
          />
        )}
      </StatsBox>

      {featuresConfig.duneAnalyticsLink && analyticsLink && (
        <DuneAnalyticsLink link={analyticsLink} />
      )}
    </Paper>
  );
};
