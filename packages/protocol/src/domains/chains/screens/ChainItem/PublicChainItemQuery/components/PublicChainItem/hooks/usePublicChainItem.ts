import { ChainProtocolContextValue } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Chain, ChainSubType, ChainType } from 'domains/chains/types';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { Tab } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { processChain } from 'domains/chains/screens/ChainItem/utils/processChain';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';

import { usePublicChainType } from './usePublicChainType';
import { useIsTestnetPremimumOnly } from './utils';

export interface ChainItem {
  chainProtocolContext: ChainProtocolContextValue;
  chain: Chain;
  publicChain: Chain;
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  chainSubType?: ChainSubType;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  group: EndpointGroup;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  name: string;
  selectGroup: (id: ChainGroupID) => void;
  unfilteredGroup: EndpointGroup;
}

type PublicChainItemParams = IChainItemDetails & {
  onBlockedTabClick: () => void;
};

export const usePublicChainItem = ({
  chain,
  unfilteredChain: publicChain,
  onBlockedTabClick,
}: PublicChainItemParams): ChainItem => {
  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
  });

  const isTestnetPremimumOnly = useIsTestnetPremimumOnly(chain);

  const { chainType, chainTypeTab, chainTypeTabs } = usePublicChainType({
    chain,
    endpoints,
    netId,
    isBlockedTestnet: Boolean(isTestnetPremimumOnly),
    isBlockedMainnet: chain?.isMainnetPremiumOnly,
    onBlockedTabClick,
  });

  const { chainSubType, chainSubTypeTab, chainSubTypeTabs } = useChainSubType({
    chain,
    netId,
  });

  const { group, groups, groupID, groupTab, groupTabs, selectGroup } = useGroup(
    {
      chain,
      chainType,
      chainSubType,
      endpoints,
      netId,
    },
  );

  const chainProtocolContext = useChainProtocol({ group, netId });

  const publicGroups = publicEndpoints[chainType];

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  return {
    chainProtocolContext,
    chain: processChain(chain),
    publicChain: processChain(publicChain),
    chainType,
    chainTypeTab,
    chainTypeTabs,
    chainSubType,
    chainSubTypeTab,
    chainSubTypeTabs,
    group,
    groups,
    groupID,
    groupTab,
    groupTabs,
    name,
    selectGroup,
    unfilteredGroup,
  };
};
