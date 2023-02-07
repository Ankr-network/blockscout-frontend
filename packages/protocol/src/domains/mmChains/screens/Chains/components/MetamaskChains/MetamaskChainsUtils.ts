import { useMemo } from 'react';

import { getMetamaskNetwork } from 'domains/auth/components/AddNetwork/AddNetworkUtils';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/types';

export const useMetamaskChains = (chains: Chain[]) => {
  return useMemo(
    () => chains?.filter(chain => getMetamaskNetwork(chain as IApiChain)),
    [chains],
  );
};
