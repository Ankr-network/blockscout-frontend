import { useCallback } from 'react';

import { trackEndpointCopy } from 'modules/analytics/mixpanel/trackEndpointCopy';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ChainType } from 'modules/chains/types';

export const useCopyEndpointHandler = (chainType: ChainType) => {
  const { hasPremium, trackingWalletName: walletName } = useAuth();

  return useCallback(
    (endpointUrl: string) => {
      trackEndpointCopy({
        chainType,
        endpointUrl,
        hasPremium,
        walletName: walletName!,
      });
    },
    [chainType, hasPremium, walletName],
  );
};
