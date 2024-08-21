import { useMemo } from 'react';

import { ChainProtocolContextValue } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { IPublicChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Chain, ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { EndpointGroup } from 'modules/endpoints/types';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderContent';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { useDialog } from 'modules/common/hooks/useDialog';
import { CodeExampleModal } from 'modules/chains/components/CodeExampleModal';

import { useIsTestnetPremimumOnly } from './utils';
import { usePublicChainType } from './usePublicChainType';

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
  onBlockedTabClick,
  unfilteredChain: publicChain,
}: PublicChainItemParams): ChainItem => {
  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

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

  const { group, groupID, groupTab, groupTabs, groups, selectGroup } = useGroup(
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

  const subchainLabels = getChainLabels(chain, chainTypeTabs);

  const headerContent = useMemo(
    () => (
      <>
        <ChainItemHeaderContent
          isMultiChain={isMultiChain}
          chain={chain}
          publicChain={publicChain}
          chainType={chainType}
          chainTypeTabs={chainTypeTabs}
          chainTypeTab={chainTypeTab}
          chainSubTypeTab={chainSubTypeTab}
          chainSubTypeTabs={chainSubTypeTabs}
          group={group}
          groups={groups}
          groupID={groupID}
          groupTabs={groupTabs}
          groupTab={groupTab}
          selectGroup={selectGroup}
          subchainLabels={subchainLabels}
          isCodeExampleHidden={false}
          onOpenCodeExample={onOpenCodeExample}
        />
        <CodeExampleModal
          isOpenedCodeExample={isOpenedCodeExample}
          onCloseCodeExample={onCloseCodeExample}
          chain={chain}
        />
      </>
    ),
    [
      isMultiChain,
      chain,
      publicChain,
      chainType,
      chainTypeTabs,
      chainTypeTab,
      chainSubTypeTab,
      chainSubTypeTabs,
      group,
      groups,
      groupID,
      groupTabs,
      groupTab,
      selectGroup,
      subchainLabels,
      onOpenCodeExample,
      isOpenedCodeExample,
      onCloseCodeExample,
    ],
  );

  return {
    chainProtocolContext,
    chain,
    chainType,
    chainSubType,
    group,
    name,
    unfilteredGroup,
    headerContent,
  };
};
