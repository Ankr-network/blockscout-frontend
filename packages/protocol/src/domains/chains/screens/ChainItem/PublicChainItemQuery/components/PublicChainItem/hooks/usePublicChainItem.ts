import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useGroup } from 'domains/chains/screens/ChainItem/hooks/useGroup';
import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useIsTestnetPremimumOnly } from './utils';
import { processChain } from 'domains/chains/screens/ChainItem/utils/processChain';
import { usePublicChainType } from './usePublicChainType';
import { useCommonChainItem } from 'domains/chains/screens/ChainItem/hooks/useCommonChainItem';

export interface ChainItem {
  chain: IApiChain;
  publicChain: IApiChain;
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
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
  onBlockedTestnetClick: () => void;
};

export const usePublicChainItem = ({
  chain,
  unfilteredChain: publicChain,
  onBlockedTestnetClick,
}: PublicChainItemParams): ChainItem => {
  const { name, endpoints, netId, publicEndpoints } = useCommonChainItem({
    chain,
    publicChain,
  });

  const isTestnetPremimumOnly = useIsTestnetPremimumOnly(chain);

  const { chainType, chainTypeTab, chainTypeTabs } = usePublicChainType({
    chain,
    endpoints,
    netId,
    isBlockedTestnet: Boolean(isTestnetPremimumOnly),
    onBlockedTestnetClick,
  });

  const { group, groups, groupID, groupTab, groupTabs, selectGroup } = useGroup(
    {
      chain,
      chainType,
      endpoints,
      netId,
    },
  );

  const publicGroups = publicEndpoints[chainType];

  const unfilteredGroup =
    publicGroups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  return {
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
  };
};
