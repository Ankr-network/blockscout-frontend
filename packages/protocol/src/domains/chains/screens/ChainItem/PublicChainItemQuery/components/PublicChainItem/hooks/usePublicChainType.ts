import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { IApiChain } from 'domains/chains/api/queryChains';
import { getPublicChainTypeTabs } from './utils';
import { getInitialChainType } from 'domains/chains/screens/ChainItem/utils/getInitialChainType';

export interface ChainTypeParams {
  chain: IApiChain;
  endpoints: GroupedEndpoints;
  netId?: string;
  isBlockedTestnet: boolean;
  onBlockedTestnetClick: () => void;
}

export interface ChainTypeResult {
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
}

export const usePublicChainType = ({
  chain,
  endpoints,
  netId,
  isBlockedTestnet,
  onBlockedTestnetClick,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(
    () =>
      getPublicChainTypeTabs(
        endpoints,
        isBlockedTestnet,
        onBlockedTestnetClick,
      ),
    [endpoints, isBlockedTestnet, onBlockedTestnetClick],
  );

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