import { useMemo } from 'react';

import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { ChainItem } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainItem';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { Chain, ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { ChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderContent';
import { usePrivateChainType } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainType';
import {
  getPrivateChainSubTypeSelector,
  getPrivateChainTypeSelector,
} from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/utils';
import { ChainTypeItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { useAppSelector } from 'store/useAppSelector';
import { getChainId } from 'modules/chains/utils/getChainId';
import { getSubchainIds } from 'domains/enterprise/utils/getSubchainIds';
import {
  selectAvailableSubTypes,
  selectEnterpriseBlockchainsDependingOnSelectedApiKey,
} from 'domains/enterprise/store/selectors';

interface ChainSubTypeItem {
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
}

type PrivateChainItemParams = IPrivateChainItemDetails & {
  onBlockedTabClick: () => void;
};

// eslint-disable-next-line max-lines-per-function
export const useEnterpriseChainDetails = ({
  chain,
  isChainArchived,
  onBlockedTabClick,
  selectedGroupId,
  selectedType,
  unfilteredChain: publicChain,
}: PrivateChainItemParams): PrivateChainItem => {
  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
  });

  const { chainType, chainTypeTab, chainTypeTabs, selectType } =
    usePrivateChainType({
      chain,
      endpoints,
      netId,
      isBlockedTestnet: false,
      isBlockedMainnet: false,
      selectedType,
      onBlockedTabClick,
    });

  const availableSubtypes = useAppSelector(selectAvailableSubTypes);

  const { chainSubType, chainSubTypeTab, chainSubTypeTabs, selectSubType } =
    useChainSubType({
      availableSubtypes,
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

  const publicGroups = publicEndpoints[chainType];

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  const chainTypes = getPrivateChainTypeSelector(endpoints);
  const chainSubTypes = getPrivateChainSubTypeSelector();
  const subChainId = getChainId({
    publicChain,
    chainType,
    chainSubType,
    group,
  });

  const enterpriseSubChainIds = useAppSelector(
    selectEnterpriseBlockchainsDependingOnSelectedApiKey,
  );

  const subchainIds = useMemo(() => getSubchainIds(chain), [chain]);

  const isMetamaskButtonHidden = !enterpriseSubChainIds.some(
    enterpriseSubChainId =>
      enterpriseSubChainId === subChainId ||
      subchainIds.includes(enterpriseSubChainId),
  );

  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const headerContent = useMemo(
    () => (
      <ChainItemHeaderContent
        isMultiChain={isMultiChain}
        chain={chain}
        publicChain={publicChain}
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
        isProtocolSwitcherHidden
        isEnterprise
        isMetamaskButtonHidden={isMetamaskButtonHidden}
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
      isMetamaskButtonHidden,
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
    publicChain,
    groups,
    groupID,
    selectGroup,
  };
};
