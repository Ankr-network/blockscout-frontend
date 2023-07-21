import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { processChain } from 'domains/chains/screens/ChainItem/utils/processChain';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { ChainItem } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainItem';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { ChainSubType, ChainType } from 'domains/chains/types';
import { useIsTestnetPremimumOnly } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/utils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainSubType } from 'domains/chains/screens/ChainItem/hooks/useChainSubType';

import {
  getPrivateChainSubTypeSelector,
  getPrivateChainTypeSelector,
} from './utils';
import { usePrivateChainType } from './usePrivateChainType';

interface ChainTypeItem {
  value: ChainType;
  label: string;
}

interface ChainSubTypeItem {
  value: ChainSubType;
  label: string;
}

interface PrivateChainItem extends ChainItem {
  chainTypes: ChainTypeItem[];
  selectType: (id: ChainType) => void;
  chainSubTypes: ChainSubTypeItem[];
  selectSubType: (id: ChainSubType) => void;
}

type PrivateChainItemParams = IChainItemDetails & {
  onBlockedTabClick: () => void;
};

export const usePrivateChainItem = ({
  chain,
  unfilteredChain: publicChain,
  selectedType,
  selectedGroupId,
  onBlockedTabClick,
}: PrivateChainItemParams): PrivateChainItem => {
  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
  });

  const { hasPremium } = useAuth();

  const isTestnetPremimumOnly = useIsTestnetPremimumOnly(chain);

  const { chainType, chainTypeTab, chainTypeTabs, selectType } =
    usePrivateChainType({
      chain,
      endpoints,
      netId,
      isBlockedTestnet: !hasPremium && Boolean(isTestnetPremimumOnly),
      isBlockedMainnet: !hasPremium && chain?.isMainnetPremiumOnly,
      selectedType,
      onBlockedTabClick,
    });

  const { chainSubType, chainSubTypeTab, chainSubTypeTabs, selectSubType } =
    useChainSubType({
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
    chainSubTypes,
    selectSubType,
    group,
    groups,
    groupID,
    groupTab,
    groupTabs,
    name,
    selectGroup,
    unfilteredGroup,
    chainTypes,
    selectType,
  };
};
