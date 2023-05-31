import { useCallback } from 'react';

import { trackDashboardClick } from 'modules/analytics/mixpanel/trackDashboardClick';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useTrackDashboard = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(() => {
    trackDashboardClick({ address, hasPremium, walletName });
  }, [address, hasPremium, walletName]);
};
