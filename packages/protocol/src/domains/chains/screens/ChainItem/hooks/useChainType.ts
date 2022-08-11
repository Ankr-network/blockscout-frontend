import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { IApiChain } from 'domains/chains/api/queryChains';
import { getChainTypeTabs } from '../utils/getChainTypeTabs';
import { getInitialChainType } from '../utils/getInitialChainType';

export interface ChainTypeParams {
  chain: IApiChain;
  endpoints: GroupedEndpoints;
  netId?: string;
}

export interface ChainTypeResult {
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
}

export const useChainType = ({
  chain,
  endpoints,
  netId,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(() => getChainTypeTabs(endpoints), [endpoints]);

  const [chainTypeTabs, chainTypeTab] = useTabs<ChainType>({
    initialTabID: getInitialChainType(chain, netId),
    tabs,
  });

  return {
    chainType: chainTypeTab?.id ?? ChainType.Mainnet,
    chainTypeTab,
    chainTypeTabs,
  };
};
