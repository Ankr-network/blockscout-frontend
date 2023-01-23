import { useCallback } from 'react';

import { trackAddEmail } from 'modules/analytics/mixpanel/trackAddEmail';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useAddEmailTrackingCallback = () => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(
    (email: string) => {
      trackAddEmail({ address, email, hasPremium, walletName });
    },
    [address, hasPremium, walletName],
  );
};
