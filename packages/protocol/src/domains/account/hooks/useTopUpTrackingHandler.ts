import { useCallback } from 'react';

import { trackTopUp } from 'modules/analytics/mixpanel/trackTopUp';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { TrackTopUp } from '../types';

export const useTopUpTrackingHandler = (): TrackTopUp => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(
    params => trackTopUp({ ...params, address, hasPremium, walletName }),
    [address, hasPremium, walletName],
  );
};
