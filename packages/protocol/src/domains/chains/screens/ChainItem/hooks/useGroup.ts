import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import {
  ChainGroupID,
  EndpointGroup,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { getGroupTabs } from '../utils/getGroupTabs';
import { getGroupIdByChainId } from 'modules/endpoints/utils/getGroupByChainId';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';

export interface GroupParams {
  chain: IApiChain;
  chainType: ChainType;
  endpoints: GroupedEndpoints;
  netId?: string;
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
