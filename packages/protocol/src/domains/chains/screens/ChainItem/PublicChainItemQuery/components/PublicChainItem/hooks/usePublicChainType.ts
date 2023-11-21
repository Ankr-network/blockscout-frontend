import { useMemo } from 'react';

import { ChainType, Chain } from 'modules/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { getInitialChainType } from 'domains/chains/screens/ChainItem/utils/getInitialChainType';

import { getPublicChainTypeTabs } from './utils';

export interface ChainTypeParams {
  chain: Chain;
  endpoints: GroupedEndpoints;
  netId?: string;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  onBlockedTabClick: () => void;
}

export interface ChainTypeResult {
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  selectType: (id: ChainType) => void;
}

export const usePublicChainType = ({
  chain,
  endpoints,
  netId,
  isBlockedTestnet,
  isBlockedMainnet,
  onBlockedTabClick,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(
    () =>
      getPublicChainTypeTabs({
        endpoints,
        isBlockedTestnet,
        isBlockedMainnet,
        onBlockedTabClick,
      }),
    [endpoints, isBlockedTestnet, onBlockedTabClick, isBlockedMainnet],
  );

  const [chainTypeTabs, chainTypeTab, selectType] = useTabs<ChainType>({
    initialTabID: getInitialChainType({
      chain,
      netId,
      isMainnetPremiumOnly: chain?.isMainnetPremiumOnly,
    }),
    tabs,
  });

  return {
    chainType: chainTypeTab?.id ?? ChainType.Mainnet,
    chainTypeTab,
    chainTypeTabs,
    selectType,
  };
};
