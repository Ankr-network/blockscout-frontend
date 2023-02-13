import { useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'query-string';
import { BannerFreeToRegisterType } from 'modules/analytics/mixpanel/types';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useIsBannerV2 = () => {
  const { search } = useLocation();
  const isBannerV2 = useMemo(() => {
    const { banner } = qs.parse(search);
    return banner === BannerFreeToRegisterType.register;
  }, [search]);

  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return {
      isBannerV2: false,
    };
  }

  return {
    isBannerV2,
  };
};
