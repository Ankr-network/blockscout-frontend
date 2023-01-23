import { useCallback } from 'react';

import { TrackTopUp } from '../types';
import { trackTopUp } from 'modules/analytics/mixpanel/trackTopUp';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useTopUpTrackingHandler = (): TrackTopUp => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(
    params => trackTopUp({ ...params, address, hasPremium, walletName }),
    [address, hasPremium, walletName],
  );
};
