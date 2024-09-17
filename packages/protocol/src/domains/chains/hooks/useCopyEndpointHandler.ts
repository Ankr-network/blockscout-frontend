import { useCallback } from 'react';
import { ChainType } from '@ankr.com/chains-list';

import { trackEndpointCopy } from 'modules/analytics/mixpanel/trackEndpointCopy';
import { useAuth } from 'domains/auth/hooks/useAuth';

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
