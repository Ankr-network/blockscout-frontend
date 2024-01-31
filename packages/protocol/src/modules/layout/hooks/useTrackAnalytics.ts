import { useCallback } from 'react';

import { trackAnalyticsClick } from 'modules/analytics/mixpanel/trackAnalyticsClick';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useTrackAnalytics = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(() => {
    trackAnalyticsClick({ address, hasPremium, walletName });
  }, [address, hasPremium, walletName]);
};
