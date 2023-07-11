import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { processChain } from 'domains/chains/screens/ChainItem/utils/processChain';
import { usePrivateChainType } from './usePrivateChainType';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';
import { ChainItem } from 'domains/chains/screens/ChainItem/PublicChainItemQuery/components/PublicChainItem/hooks/usePublicChainItem';
import { useChainProtocol } from 'domains/chains/screens/ChainItem/hooks/useChainProtocol';
import { ChainType } from 'domains/chains/types';
import { getPrivateChainTypeSelector } from './utils';

interface ChainTypeItem {
  value: ChainType;
  label: string;
}

interface PrivateChainItem extends ChainItem {
  chainTypes: ChainTypeItem[];
  selectType: (id: ChainType) => void;
}

export const usePrivateChainItem = ({
  chain,
  unfilteredChain: publicChain,
  selectedType,
  selectedGroupId,
}: IChainItemDetails): PrivateChainItem => {
  const { endpoints, name, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
  });

  const { chainType, chainTypeTab, chainTypeTabs, selectType } =
    usePrivateChainType({
      chain,
      endpoints,
      netId,
      selectedType,
    });

  const { group, groups, groupID, groupTab, groupTabs, selectGroup } = useGroup(
    {
      chain,
      chainType,
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

  return {
    chainProtocolContext,
    chain: processChain(chain),
    publicChain: processChain(publicChain),
    chainType,
    chainTypeTab,
    chainTypeTabs,
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
