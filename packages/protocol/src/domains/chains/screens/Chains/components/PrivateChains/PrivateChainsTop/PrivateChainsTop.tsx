import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { FailedRequestsBannerContainer } from 'domains/chains/components/FailedRequestsBanner/FailedRequestsBannerContainer';
import { Timeframe } from 'domains/chains/types';
import { UsageSummary } from '../components/UsageSummary';

interface IPrivateChainsProps {
  timeframe: Timeframe;
  switchStatsTimeframe: () => void;
}

export const PrivateChainsTop = ({
  timeframe,
  switchStatsTimeframe,
}: IPrivateChainsProps) => {
  const { isFreePremium } = useAuth();

  return (
    <>
      <ExpiredTokenBanner />
      <UsageSummary
        timeframe={timeframe}
        switchTimeframe={switchStatsTimeframe}
      />
      {isFreePremium && (
        <FailedRequestsBannerContainer timeframe={Timeframe.Month} />
      )}
    </>
  );
};
