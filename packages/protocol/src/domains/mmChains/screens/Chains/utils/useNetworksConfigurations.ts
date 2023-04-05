import { useMemo } from 'react';

import { getNetworkConfiguration } from 'domains/auth/components/AddNetwork/AddNetworkUtils';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/types';

export const useNetworksConfigurations = (chains: Chain[]) => {
  return useMemo(
    () => chains?.filter(chain => getNetworkConfiguration(chain as IApiChain)),
    [chains],
  );
};
