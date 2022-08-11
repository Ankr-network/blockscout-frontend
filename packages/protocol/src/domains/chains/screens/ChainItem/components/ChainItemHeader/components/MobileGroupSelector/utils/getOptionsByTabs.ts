import { ISelectOption } from 'uiKit/Select';

import { ChainGroupID } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Tab } from 'modules/common/hooks/useTabs';
import { getFallbackEndpointGroup } from 'modules/endpoints/constants/groups';
import { groupIDToGroupMap } from 'modules/endpoints/constants/groupIDToGroupMap';

export const getOptionsByTabs = (tabs: Tab<ChainGroupID>[], chain: IApiChain) =>
  tabs.map<ISelectOption>(({ id }) => ({
    label:
      groupIDToGroupMap[id]?.pluralName ||
      getFallbackEndpointGroup(chain.name).pluralName,
    value: id,
  }));
