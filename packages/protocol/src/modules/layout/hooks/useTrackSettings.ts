import { useCallback } from 'react';

import { trackSettingsClick } from 'modules/analytics/mixpanel/trackSettingsClick';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useTrackSettings = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(() => {
    trackSettingsClick({ address, hasPremium, walletName });
  }, [address, hasPremium, walletName]);
};
