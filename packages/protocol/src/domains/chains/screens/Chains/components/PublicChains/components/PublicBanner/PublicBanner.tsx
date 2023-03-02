import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner } from 'domains/chains/components/InfoBanner';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

export const PublicBanner = () => {
  const { loading } = useAuth();

  return loading ? <UpgradePlanBanner /> : <InfoBanner />;
};
