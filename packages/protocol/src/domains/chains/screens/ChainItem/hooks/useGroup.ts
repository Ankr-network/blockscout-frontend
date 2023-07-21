import { useMemo } from 'react';

import { ChainID, ChainType, Chain, ChainSubType } from 'domains/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { getGroupIdByChainId } from 'modules/endpoints/utils/getGroupByChainId';

import { getGroupTabs } from '../utils/getGroupTabs';
import { filterEndpointsByChainSubType } from '../utils/filterEndpointsByChainSubType';

export interface GroupParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  endpoints: GroupedEndpoints;
  netId?: ChainID;
  selectedGroupId?: ChainGroupID;
}

export interface GroupResult {
  group: EndpointGroup;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  selectGroup: (id: ChainGroupID) => void;
}

export const useGroup = ({
  chain,
  chainType,
  chainSubType,
  endpoints,
  netId,
  selectedGroupId,
}: GroupParams): GroupResult => {
  const groupEndpoints = endpoints[chainType];

  const groups = filterEndpointsByChainSubType({
    groupEndpoints,
    chainSubType,
  });

  const tabs = useMemo(() => getGroupTabs(groups), [groups]);

  const [groupTabs, groupTab, selectGroup] = useTabs({
    initialTabID: selectedGroupId || getGroupIdByChainId(netId),
    tabs,
  });
  const groupID = groupTab?.id ?? ChainGroupID.FALLBACK;
  const group =
    groups.find(gr => gr.id === groupID) ||
    getFallbackEndpointGroup(chain.name);

  return {
    group,
    groups,
    groupID,
    groupTab,
    groupTabs,
    selectGroup,
  };
};
