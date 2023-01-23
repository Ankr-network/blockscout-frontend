import { useCallback } from 'react';

import { SectionID } from '../types';
import { trackChainTabSelect } from 'modules/analytics/mixpanel/trackChainTabSelect';
import { useAuth } from 'domains/auth/hooks/useAuth';

export type TabSelectHandlerGetter = (tabName: SectionID) => () => void;

export const useTabSelectHandlerGetter = (): TabSelectHandlerGetter => {
  const { address, hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(
    (tabName: SectionID) => () => {
      trackChainTabSelect({ address, hasPremium, tabName, walletName });
    },
    [address, hasPremium, walletName],
  );
};
