import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { getGroupIdByChainId } from 'modules/endpoints/utils/getGroupByChainId';
import { getGroupTabs } from '../utils/getGroupTabs';

export interface GroupParams {
  chain: IApiChain;
  chainType: ChainType;
  endpoints: GroupedEndpoints;
  netId?: ChainID;
}

export interface GroupResult {
  group: EndpointGroup;
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  selectGroup: (id: ChainGroupID) => void;
}

export const useGroup = ({
  chain,
  chainType,
  endpoints,
  netId,
}: GroupParams): GroupResult => {
  const groups = endpoints[chainType];

  const tabs = useMemo(() => getGroupTabs(groups), [groups]);

  const [groupTabs, groupTab, selectGroup] = useTabs({
    initialTabID: getGroupIdByChainId(netId),
    tabs,
  });
  const groupID = groupTab?.id ?? ChainGroupID.FALLBACK;
  const group =
    groups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  return {
    group,
    groupID,
    groupTab,
    groupTabs,
    selectGroup,
  };
};
