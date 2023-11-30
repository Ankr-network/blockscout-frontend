import { useMemo } from 'react';

import { getNetworkConfiguration } from 'domains/auth/components/AddNetwork/AddNetworkUtils';
import { Chain } from 'modules/chains/types';

export const useNetworksConfigurations = (chains: Chain[]) => {
  return useMemo(
    () =>
      chains?.filter(chain =>
        getNetworkConfiguration({ isEnterprise: false, publicChain: chain }),
      ),
    [chains],
  );
};
