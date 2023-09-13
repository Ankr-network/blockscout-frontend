import { useMemo } from 'react';

import { ChainProtocolContextValue } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { IPublicChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Chain, ChainID, ChainSubType, ChainType } from 'domains/chains/types';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { EndpointGroup } from 'modules/endpoints/types';
import { processChain } from 'domains/chains/screens/ChainItem/utils/processChain';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderContent';

import { usePublicChainType } from './usePublicChainType';
import { useIsTestnetPremimumOnly } from './utils';

export interface ChainItem {
  chainProtocolContext: ChainProtocolContextValue;
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  name: string;
  unfilteredGroup: EndpointGroup;
  headerContent: JSX.Element;
}

type PublicChainItemParams = IPublicChainItemDetails & {
  onBlockedTabClick: () => void;
};

export const usePublicChainItem = ({
  chain,
  unfilteredChain: publicChain,
  isChainArchived,
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

  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  const headerContent = useMemo(
    () => (
      <ChainItemHeaderContent
        isMultiChain={isMultiChain}
        chain={processChain(chain)}
        publicChain={processChain(publicChain)}
        chainType={chainType}
        chainTypeTabs={chainTypeTabs}
        chainTypeTab={chainTypeTab}
        chainSubType={chainSubType}
        chainSubTypeTab={chainSubTypeTab}
        chainSubTypeTabs={chainSubTypeTabs}
        group={group}
        groups={groups}
        groupID={groupID}
        groupTabs={groupTabs}
        groupTab={groupTab}
        isChainArchived={isChainArchived}
        selectGroup={selectGroup}
      />
    ),
    [
      isMultiChain,
      chain,
      publicChain,
      chainType,
      chainTypeTabs,
      chainTypeTab,
      chainSubType,
      chainSubTypeTab,
      chainSubTypeTabs,
      group,
      groups,
      groupID,
      groupTabs,
      groupTab,
      isChainArchived,
      selectGroup,
    ],
  );

  return {
    chainProtocolContext,
    chain: processChain(chain),
    chainType,
    chainSubType,
    group,
    name,
    unfilteredGroup,
    headerContent,
  };
};
