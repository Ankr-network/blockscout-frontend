import { useMemo } from 'react';

import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { useNetId } from './useNetId';
import { processChain } from '../utils/processChain';
import { getChainName } from 'uiKit/utils/useMetatags';
import { IApiChain } from 'domains/chains/api/queryChains';

export interface ICommonChainItemParams {
  chain: IApiChain;
  publicChain: IApiChain;
}

export const useCommonChainItem = ({
  chain,
  publicChain,
}: ICommonChainItemParams) => {
  const chainId = chain.id;
  const name = useMemo(() => getChainName(chainId), [chainId]);
  const endpoints = useGroupedEndpoints(chain);
  const netId = useNetId();
  const publicEndpoints = useGroupedEndpoints(publicChain);

  return {
    chain: processChain(chain),
    publicChain: processChain(publicChain),
    name,
    endpoints,
    netId,
    publicEndpoints,
  };
};
