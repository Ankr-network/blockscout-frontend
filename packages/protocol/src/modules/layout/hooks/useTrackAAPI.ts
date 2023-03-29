import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { trackAAPIClick } from 'modules/analytics/mixpanel/trackAAPIClick';

export const useTrackAAPI = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(() => {
    trackAAPIClick({ address, hasPremium, walletName });
  }, [address, hasPremium, walletName]);
};
