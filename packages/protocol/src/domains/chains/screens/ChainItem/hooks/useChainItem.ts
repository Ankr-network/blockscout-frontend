import { useAuth } from 'domains/auth/hooks/useAuth';
import { IChainItemDetails as Details } from 'domains/chains/actions/fetchChain';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useMemo } from 'react';
import { getChainName } from 'uiKit/utils/useMetatags';
import { processChain } from '../utils/processChain';
import { useChainType } from './useChainType';
import { useGroup } from './useGroup';
import { useNetId } from './useNetId';

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
  isChainArchived: boolean;
  name: string;
  selectGroup: (id: ChainGroupID) => void;
  unfilteredGroup: EndpointGroup;
}

export const useChainItem = ({
  nodes,
  chain,
  unfilteredChain: publicChain,
  onBlockedTestnetClick,
}: Details & { onBlockedTestnetClick: () => void }): ChainItem => {
  const isChainArchived = useMemo(
    () => !!nodes?.some(item => item.isArchive),
    [nodes],
  );

  const chainId = chain.id;
  const name = useMemo(() => getChainName(chainId), [chainId]);

  const endpoints = useGroupedEndpoints(chain);
  const netId = useNetId();

  const { hasPrivateAccess } = useAuth();

  const isTestnetPremimumOnly = useMemo(
    () =>
      chain.testnets && chain.testnets?.length > 0
        ? chain.testnets[0].premiumOnly
        : false,
    [chain],
  );

  const { chainType, chainTypeTab, chainTypeTabs } = useChainType({
    chain,
    endpoints,
    netId,
    isBlockedTestnet: !hasPrivateAccess && Boolean(isTestnetPremimumOnly),
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

  const publicEndpoints = useGroupedEndpoints(publicChain);

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
    isChainArchived,
    name,
    selectGroup,
    unfilteredGroup,
  };
};
