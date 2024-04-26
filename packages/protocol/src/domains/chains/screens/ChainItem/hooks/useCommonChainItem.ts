import { useMemo } from 'react';

import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { getChainName } from 'uiKit/utils/metatags';
import { Chain } from 'modules/chains/types';

import { useNetId } from './useNetId';

export interface ICommonChainItemParams {
  chain: Chain;
  publicChain: Chain;
  shouldExpandFlareTestnets?: boolean;
}

export const useCommonChainItem = ({
  chain,
  publicChain,
  shouldExpandFlareTestnets = false,
}: ICommonChainItemParams) => {
  const chainId = chain.id;
  const name = useMemo(() => getChainName(chainId), [chainId]);
  const endpoints = useGroupedEndpoints(chain, shouldExpandFlareTestnets);
  const netId = useNetId();
  const publicEndpoints = useGroupedEndpoints(chain, shouldExpandFlareTestnets);

  return {
    chain,
    publicChain,
    name,
    endpoints,
    netId,
    publicEndpoints,
  };
};
