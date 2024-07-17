import { ReactNode, useMemo } from 'react';

import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { ChainItem } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainItem';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { Chain, ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { useIsTestnetPremimumOnly } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/utils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderContent';
import { useDialog } from 'modules/common/hooks/useDialog';
import { CodeExampleModal } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/CodeExampleModal';
import { Tab } from 'modules/common/hooks/useTabs';

import {
  getPrivateChainSubTypeSelector,
  getPrivateChainTypeSelector,
} from './utils';
import { usePrivateChainType } from './usePrivateChainType';
import { useRequestsString } from './useRequestsString';

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
  publicChain: Chain;
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
  isPremiumLabelHidden?: boolean;
  isChainRequestStatsVisible?: boolean;
  shouldExpandFlareTestnets?: boolean;
  isCompactView?: boolean;
};

// eslint-disable-next-line max-lines-per-function
export const usePrivateChainItem = ({
  additionalSelector,
  chain,
  isChainArchived,
  isChainRequestStatsVisible,
  isCompactView,
  isGroupSelectorAutoWidth,
  isHiddenMainnet,
  isPremiumLabelHidden,
  onBlockedTabClick,
  selectedGroupId,
  selectedType,
  shouldExpandFlareTestnets = false,
  unfilteredChain: publicChain,
}: PrivateChainItemParams): PrivateChainItem => {
  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
    shouldExpandFlareTestnets,
  });

  const { hasPremium } = useAuth();

  const isTestnetPremiumOnly = useIsTestnetPremimumOnly(chain);

  const { chainType, chainTypeTab, chainTypeTabs, selectType } =
    usePrivateChainType({
      chain,
      endpoints,
      netId,
      isBlockedTestnet: !hasPremium && Boolean(isTestnetPremiumOnly),
      isBlockedMainnet: !hasPremium && chain?.isMainnetPremiumOnly,
      isHiddenMainnet,
      selectedType,
      onBlockedTabClick,
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
    },
  );
  const chainProtocolContext = useChainProtocol({ group, netId });

  const { requestsString } = useRequestsString({
    chain,
    chainType,
    chainSubType,
    group,
    chainProtocolContext,
    isChainRequestStatsVisible,
  });

  const publicGroups = publicEndpoints[chainType];

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  const chainTypes = getPrivateChainTypeSelector(endpoints);
  const chainSubTypes = getPrivateChainSubTypeSelector();
  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const headerContent = useMemo(
    () => (
      <>
        <ChainItemHeaderContent
          additionalSelector={additionalSelector}
          chain={chain}
          chainSubType={chainSubType}
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
          isChainArchived={isChainArchived}
          isMultiChain={isMultiChain}
          publicChain={publicChain}
          selectGroup={selectGroup}
          isGroupSelectorAutoWidth={isGroupSelectorAutoWidth}
          isPremiumLabelHidden={isPremiumLabelHidden}
          requestsString={
            isChainRequestStatsVisible ? requestsString : undefined
          }
          isCompactView={isCompactView}
          onOpenCodeExample={onOpenCodeExample}
          isPremiumChain={
            !hasPremium &&
            (chain?.isMainnetPremiumOnly || Boolean(isTestnetPremiumOnly))
          }
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
      chainSubType,
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
      isChainArchived,
      isMultiChain,
      publicChain,
      selectGroup,
      isGroupSelectorAutoWidth,
      isPremiumLabelHidden,
      isChainRequestStatsVisible,
      requestsString,
      isCompactView,
      onOpenCodeExample,
      hasPremium,
      isTestnetPremiumOnly,
      isOpenedCodeExample,
      onCloseCodeExample,
    ],
  );

  return {
    chainProtocolContext,
    chain,
    publicChain,
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
