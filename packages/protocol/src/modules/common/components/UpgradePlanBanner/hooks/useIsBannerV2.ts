import { BannerFreeToRegisterType } from 'modules/analytics/mixpanel/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

const BANNER_CODE = 'banner';

export const useIsBannerV2 = () => {
  const params = useQueryParams();
  const { isLoggedIn } = useAuth();

  const banner = params.get(BANNER_CODE);

  return {
    isBannerV2: !isLoggedIn && banner === BannerFreeToRegisterType.register,
  };
};
