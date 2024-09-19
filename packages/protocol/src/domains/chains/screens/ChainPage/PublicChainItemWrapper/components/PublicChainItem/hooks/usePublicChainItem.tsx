import { useMemo } from 'react';
import {
  Chain,
  ChainID,
  ChainSubType,
  ChainType,
  isTestnetPremiumOnly,
} from '@ankr.com/chains-list';

import { ChainProtocolContextValue } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { useGroup } from 'domains/chains/screens/ChainPage/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { EndpointGroup } from 'modules/endpoints/types';
import { useChainProtocol } from 'domains/chains/screens/ChainPage/hooks/useChainProtocol';
import { useCommonChainItem } from 'domains/chains/screens/ChainPage/hooks/useCommonChainItem';
import { useChainSubType } from 'domains/chains/screens/ChainPage/hooks/useChainSubType';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/ChainItemHeaderContent';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { useDialog } from 'modules/common/hooks/useDialog';
import { CodeExampleModal } from 'modules/chains/components/CodeExampleModal';

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

type PublicChainItemParams = {
  chain: Chain;
  unfilteredChain: Chain;
  onBlockedTabClick: () => void;
};

export const usePublicChainItem = ({
  chain,
  onBlockedTabClick,
}: PublicChainItemParams): ChainItem => {
  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
  });

  const { chainType, chainTypeTab, chainTypeTabs } = usePublicChainType({
    chain,
    endpoints,
    netId,
    isBlockedTestnet: isTestnetPremiumOnly(chain),
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
