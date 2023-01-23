import { useCallback } from 'react';

import { trackDocsClick } from 'modules/analytics/mixpanel/trackDocsClick';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useTrackDocs = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(() => {
    trackDocsClick({ address, hasPremium, walletName });
  }, [address, hasPremium, walletName]);
};
