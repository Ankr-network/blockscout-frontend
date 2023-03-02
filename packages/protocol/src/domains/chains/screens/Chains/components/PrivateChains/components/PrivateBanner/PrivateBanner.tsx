import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner } from 'domains/chains/components/InfoBanner';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

export const PrivateBanner = () => {
  const { isFreePremium } = useAuth();

  return (
    <>
      <ExpiredTokenBanner />
      {isFreePremium ? <InfoBanner /> : <UpgradePlanBanner />}
    </>
  );
};
