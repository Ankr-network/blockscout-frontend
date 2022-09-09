import { useMemo } from 'react';
import { getChainName } from 'uiKit/utils/useMetatags';

import { IChainItemDetails as Details } from 'domains/chains/actions/fetchChain';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useChain } from './useChain';
import { useChainType } from './useChainType';
import { useGroup } from './useGroup';
import { useNetId } from './useNetId';

export interface ChainItem {
  chain: IApiChain;
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  group: EndpointGroup;
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  isChainArchived: boolean;
  name: string;
  selectGroup: (id: ChainGroupID) => void;
}

export const useChainItem = ({ nodes }: Details): ChainItem => {
  const chain = useChain();

  const isChainArchived = useMemo(
    () => !!nodes?.some(item => item.isArchive),
    [nodes],
  );

  const chainId = chain.id;
  const name = useMemo(() => getChainName(chainId), [chainId]);

  const endpoints = useGroupedEndpoints(chain);
  const netId = useNetId();

  const { chainType, chainTypeTab, chainTypeTabs } = useChainType({
    chain,
    endpoints,
    netId,
  });
  const { group, groupID, groupTab, groupTabs, selectGroup } = useGroup({
    chain,
    chainType,
    endpoints,
    netId,
  });

  return {
    chain,
    chainType,
    chainTypeTab,
    chainTypeTabs,
    group,
    groupID,
    groupTab,
    groupTabs,
    isChainArchived,
    name,
    selectGroup,
  };
};
