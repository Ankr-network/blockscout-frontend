import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { chackHasWSFeature } from 'modules/common/components/GetStartedSection/components/WsFeatureEndpoints/useWsFeatureEndpoints';

import { GroupTab } from '../components/GroupTab';

export const getGroupTabs = (groups: EndpointGroup[]) => {
  return groups.map<Tab<ChainGroupID>>((group, index) => {
    const { id, name, pluralName, urlsCount } = group;
    const hasWs = chackHasWSFeature(group);

    return {
      id,
      title: (isSelected: boolean) => (
        <GroupTab
          isLast={index === groups.length - 1}
          isSelected={isSelected}
          label={urlsCount > 1 || hasWs ? pluralName : name}
        />
      ),
    };
  });
};
