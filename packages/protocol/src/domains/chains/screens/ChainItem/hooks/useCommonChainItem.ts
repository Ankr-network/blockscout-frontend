import { useMemo } from 'react';

import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { getChainName } from 'uiKit/utils/metatags';
import { Chain } from 'domains/chains/types';

import { useNetId } from './useNetId';
import { processChain } from '../utils/processChain';

export interface ICommonChainItemParams {
  chain: Chain;
  publicChain: Chain;
}

export const useCommonChainItem = ({
  chain,
  publicChain,
}: ICommonChainItemParams) => {
  const chainId = chain.id;
  const name = useMemo(() => getChainName(chainId), [chainId]);
  const endpoints = useGroupedEndpoints(chain);
  const netId = useNetId();
  const publicEndpoints = useGroupedEndpoints(chain);

  return {
    chain: processChain(chain),
    publicChain: processChain(publicChain),
    name,
    endpoints,
    netId,
    publicEndpoints,
  };
};
