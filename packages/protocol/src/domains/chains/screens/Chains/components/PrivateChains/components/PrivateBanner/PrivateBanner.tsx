import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner } from 'domains/chains/components/InfoBanner';
import { BannerSkeleton } from 'modules/common/components/BannerSkeleton';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

export const PrivateBanner = () => {
  const { isFreePremium, loading } = useAuth();

  if (loading) return <BannerSkeleton />;

  return (
    <>
      <ExpiredTokenBanner />
      {isFreePremium ? <InfoBanner /> : <UpgradePlanBanner />}
    </>
  );
};
