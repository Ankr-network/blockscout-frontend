import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { chackHasWSFeature } from '../components/GetStartedSection/components/WsFeatureEndpoints/useWsFeatureEndpoints';

export const getGroupTabs = (groups: EndpointGroup[]) => {
  return groups.map<Tab<ChainGroupID>>((group, index) => {
    const { id, urlsCount, name, pluralName } = group;
    const hasWs = chackHasWSFeature(group);

    return {
      id,
      title: (isSelected: boolean) => {
        return (
          <SecondaryTab
            isLast={index === groups.length - 1}
            isSelected={isSelected}
            label={urlsCount > 1 || hasWs ? pluralName : name}
          />
        );
      },
    };
  });
};
