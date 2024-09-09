import { ReactNode, useMemo } from 'react';

import { IPrivateChainItemDetails } from 'domains/chains/actions/private/types';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { ChainItem } from 'domains/chains/screens/ChainItem/PublicChainItemWrapper/components/PublicChainItem/hooks/usePublicChainItem';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderContent';
import { useDialog } from 'modules/common/hooks/useDialog';
import { CodeExampleModal } from 'modules/chains/components/CodeExampleModal';
import { Tab } from 'modules/common/hooks/useTabs';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { isTestnetPremiumOnly } from 'modules/chains/utils/isTestnetPremiumOnly';

import {
  getPrivateChainSubTypeSelector,
  getPrivateChainTypeSelector,
} from './utils';
import { usePrivateChainType } from './usePrivateChainType';

export interface ChainTypeItem {
  value: ChainType;
  label: string;
}

export interface ChainSubTypeItem {
  value: ChainSubType;
  label: string;
}

interface PrivateChainItem extends ChainItem {
  chainTypes: ChainTypeItem[];
  selectType: (id: ChainType) => void;
  chainSubTypes: ChainSubTypeItem[];
  selectSubType: (id: ChainSubType) => void;
  endpoints: GroupedEndpoints;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  selectGroup: (id: ChainGroupID) => void;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
}

type PrivateChainItemParams = IPrivateChainItemDetails & {
  additionalSelector?: ReactNode;
  onBlockedTabClick?: () => void;
  isGroupSelectorAutoWidth?: boolean;
  isHiddenMainnet?: boolean;
  shouldExpandFlareTestnets?: boolean;
  isCompactView?: boolean;
  shouldHideEndpoints?: boolean;
  isCodeExampleHidden?: boolean;
  addToProjectButton?: ReactNode;
  isProtocolSwitcherHidden?: boolean;
  shouldMergeTendermintGroups?: boolean;
  isChainSwitcherBlockingIgnored?: boolean;
};

// eslint-disable-next-line max-lines-per-function
export const usePrivateChainItem = ({
  addToProjectButton,
  additionalSelector,
  chain,
  isChainSwitcherBlockingIgnored,
  isCodeExampleHidden,
  isCompactView,
  isGroupSelectorAutoWidth,
  isHiddenMainnet,
  isProtocolSwitcherHidden,
  onBlockedTabClick,
  selectedGroupId,
  selectedType,
  shouldExpandFlareTestnets = false,
  shouldHideEndpoints,
  shouldMergeTendermintGroups,
}: PrivateChainItemParams): PrivateChainItem => {
  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    shouldExpandFlareTestnets,
  });

  const { hasPremium } = useAuth();

  const { chainType, chainTypeTab, chainTypeTabs, selectType } =
    usePrivateChainType({
      chain,
      endpoints,
      netId,
      isBlockedTestnet: !hasPremium && isTestnetPremiumOnly(chain),
      isBlockedMainnet: !hasPremium && chain?.isMainnetPremiumOnly,
      isHiddenMainnet,
      selectedType,
      onBlockedTabClick,
      isChainSwitcherBlockingIgnored,
    });

  const { chainSubType, chainSubTypeTab, chainSubTypeTabs, selectSubType } =
    useChainSubType({
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
      selectedGroupId,
      shouldMergeTendermintGroups,
    },
  );

  const chainProtocolContext = useChainProtocol({ group, netId });

  const publicGroups = publicEndpoints[chainType];

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  const chainTypes = getPrivateChainTypeSelector(endpoints);
  const chainSubTypes = getPrivateChainSubTypeSelector();
  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const subchainLabels = getChainLabels(chain, chainTypeTabs);

  const headerContent = useMemo(
    () => (
      <>
        <ChainItemHeaderContent
          additionalSelector={additionalSelector}
          chain={chain}
          chainSubTypeTab={chainSubTypeTab}
          chainSubTypeTabs={chainSubTypeTabs}
          chainType={chainType}
          chainTypeTab={chainTypeTab}
          chainTypeTabs={chainTypeTabs}
          group={group}
          groupID={groupID}
          groupTab={groupTab}
          groupTabs={groupTabs}
          groups={groups}
          isMultiChain={isMultiChain}
          selectGroup={selectGroup}
          isGroupSelectorAutoWidth={isGroupSelectorAutoWidth}
          isCompactView={isCompactView}
          onOpenCodeExample={onOpenCodeExample}
          shouldHideEndpoints={shouldHideEndpoints}
          addToProjectButton={addToProjectButton}
          isCodeExampleHidden={isCodeExampleHidden}
          isProtocolSwitcherHidden={isProtocolSwitcherHidden}
          isSubchainSelectorHidden={!isCompactView}
          subchainLabels={subchainLabels}
          hasSelectorForMetamaskButton
        />
        <CodeExampleModal
          isOpenedCodeExample={isOpenedCodeExample}
          onCloseCodeExample={onCloseCodeExample}
          chain={chain}
        />
      </>
    ),
    [
      additionalSelector,
      chain,
      chainSubTypeTab,
      chainSubTypeTabs,
      chainType,
      chainTypeTab,
      chainTypeTabs,
      group,
      groupID,
      groupTab,
      groupTabs,
      groups,
      isMultiChain,
      selectGroup,
      isGroupSelectorAutoWidth,
      isCompactView,
      onOpenCodeExample,
      shouldHideEndpoints,
      addToProjectButton,
      isCodeExampleHidden,
      isOpenedCodeExample,
      onCloseCodeExample,
      isProtocolSwitcherHidden,
      subchainLabels,
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
    chainTypes,
    selectType,
    chainSubTypes,
    selectSubType,
    endpoints,
    groups,
    groupID,
    selectGroup,
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupTab,
    groupTabs,
  };
};
