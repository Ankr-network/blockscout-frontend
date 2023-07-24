import { useMemo } from 'react';

import { ChainType, Chain } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { useTabs } from 'modules/common/hooks/useTabs';
import { getInitialChainType } from 'domains/chains/screens/ChainItem/utils/getInitialChainType';
import { ChainTypeResult } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainType';

import { getPrivateChainTypeTabs } from './utils';

export interface ChainTypeParams {
  chain: Chain;
  endpoints: GroupedEndpoints;
  netId?: string;
  selectedType?: ChainType;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  onBlockedTabClick: () => void;
}

export const usePrivateChainType = ({
  chain,
  endpoints,
  netId,
  selectedType,
  isBlockedTestnet,
  isBlockedMainnet,
  onBlockedTabClick,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(
    () =>
      getPrivateChainTypeTabs({
        endpoints,
        isBlockedTestnet,
        isBlockedMainnet,
        onBlockedTabClick,
      }),
    [endpoints, isBlockedTestnet, isBlockedMainnet, onBlockedTabClick],
  );

  const [chainTypeTabs, chainTypeTab, selectType] = useTabs<ChainType>({
    initialTabID: getInitialChainType({
      chain,
      netId,
      selectedType,
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
