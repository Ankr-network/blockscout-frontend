import { useAuth } from 'domains/auth/hooks/useAuth';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { Timeframe } from 'domains/chains/types';
import { FailedRequestsBannerContainer } from 'domains/chains/components/FailedRequestsBanner/FailedRequestsBannerContainer';
import { RequestsBannerContainer } from 'domains/chains/components/RequestsBannerContainer/RequestsBannerContainer';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';

interface IPrivateChainsProps {
  timeframe: Timeframe;
}

export const PrivateChainsTop = ({ timeframe }: IPrivateChainsProps) => {
  const { isFreePremium, hasUserEndpointToken, hasPremium } = useAuth();

  return (
    <>
      <ExpiredTokenBanner />
      {isFreePremium && hasUserEndpointToken && (
        <FailedRequestsBannerContainer timeframe={Timeframe.Month} />
      )}

      {hasPremium && hasUserEndpointToken && (
        <RequestsBannerContainer timeframe={timeframe} />
      )}
      <JwtTokenManager />
    </>
  );
};
