import { useMemo } from 'react';
import { ChainType, Chain } from '@ankr.com/chains-list';

import { GroupedEndpoints } from 'modules/endpoints/types';
import { useTabs } from 'modules/common/hooks/useTabs';
import { getInitialChainType } from 'domains/chains/screens/ChainPage/utils/getInitialChainType';
import { ChainTypeResult } from 'domains/chains/screens/ChainPage/PublicChainItemWrapper/components/PublicChainItem/hooks/usePublicChainType';

import { getPrivateChainTypeTabs } from './utils';

export interface ChainTypeParams {
  chain: Chain;
  endpoints: GroupedEndpoints;
  netId?: string;
  selectedType?: ChainType;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  isHiddenMainnet?: boolean;
  isChainSwitcherBlockingIgnored?: boolean;
  onBlockedTabClick?: () => void;
}

export const usePrivateChainType = ({
  chain,
  endpoints,
  isBlockedMainnet,
  isBlockedTestnet,
  isChainSwitcherBlockingIgnored,
  isHiddenMainnet,
  netId,
  onBlockedTabClick,
  selectedType,
}: ChainTypeParams): ChainTypeResult => {
  const tabs = useMemo(
    () =>
      getPrivateChainTypeTabs({
        endpoints,
        isBlockedTestnet,
        isBlockedMainnet,
        isHiddenMainnet,
        onBlockedTabClick,
        isChainSwitcherBlockingIgnored,
      }),
    [
      endpoints,
      isBlockedTestnet,
      isBlockedMainnet,
      isHiddenMainnet,
      onBlockedTabClick,
      isChainSwitcherBlockingIgnored,
    ],
  );

  const initialChainType = useMemo(
    () =>
      getInitialChainType({
        chain,
        netId,
        selectedType,
        isMainnetPremiumOnly: isBlockedMainnet,
        isHiddenMainnet,
      }),
    [chain, netId, selectedType, isBlockedMainnet, isHiddenMainnet],
  );

  const [chainTypeTabs, chainTypeTab, selectType] = useTabs<ChainType>({
    initialTabID: initialChainType,
    tabs: tabs.filter(tab => !tab.isHidden),
  });

  return {
    chainType: chainTypeTab?.id || ChainType.Mainnet,
    chainTypeTab,
    chainTypeTabs,
    selectType,
  };
};
