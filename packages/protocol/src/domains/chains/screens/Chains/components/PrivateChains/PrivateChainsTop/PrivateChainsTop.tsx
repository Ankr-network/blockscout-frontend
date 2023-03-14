import { Timeframe } from 'domains/chains/types';
import { PrivateBanner } from '../components/PrivateBanner';
import { UsageSummary } from '../components/UsageSummary';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { FailedRequestsBannerContainer } from 'domains/chains/components/FailedRequestsBanner/FailedRequestsBannerContainer';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';
import { JwtTokenManagerSkeleton } from 'domains/jwtToken/components/JwtTokenManager/JwtTokenManagerSkeleton';

interface IPrivateChainsProps {
  timeframe: Timeframe;
  switchStatsTimeframe: () => void;
}

export const PrivateChainsTop = ({
  timeframe,
  switchStatsTimeframe,
}: IPrivateChainsProps) => {
  const { isFreePremium, loading } = useAuth();

  return (
    <>
      <PrivateBanner />
      {loading ? (
        <JwtTokenManagerSkeleton />
      ) : (
        <>
          <UsageSummary
            timeframe={timeframe}
            switchTimeframe={switchStatsTimeframe}
          />
          {isFreePremium && (
            <FailedRequestsBannerContainer timeframe={Timeframe.Month} />
          )}
          <JwtTokenManager />
        </>
      )}
    </>
  );
};
