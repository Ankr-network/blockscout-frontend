import { Timeframe } from 'domains/chains/types';
import { PrivateBanner } from '../components/PrivateBanner';
import { UsageSummary } from '../components/UsageSummary';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { FailedRequestsBannerContainer } from 'domains/chains/components/FailedRequestsBanner/FailedRequestsBannerContainer';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';

interface IPrivateChainsProps {
  timeframe: Timeframe;
  switchStatsTimeframe: () => void;
}

export const PrivateChainsTop = ({
  timeframe,
  switchStatsTimeframe,
}: IPrivateChainsProps) => {
  const { isFreePremium, hasUserEndpointToken } = useAuth();

  return (
    <>
      <PrivateBanner />
      <UsageSummary
        timeframe={timeframe}
        switchTimeframe={switchStatsTimeframe}
      />
      {isFreePremium && hasUserEndpointToken && (
        <FailedRequestsBannerContainer timeframe={Timeframe.Month} />
      )}
      <JwtTokenManager />
    </>
  );
};
