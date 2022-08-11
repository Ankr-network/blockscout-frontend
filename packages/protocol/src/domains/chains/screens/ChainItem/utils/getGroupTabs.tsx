import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTab } from '../components/SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';

export const getGroupTabs = (groups: EndpointGroup[]): Tab<ChainGroupID>[] =>
  groups.map<Tab<ChainGroupID>>(({ id, pluralName }, index) => ({
    id,
    title: (isSelected: boolean) => (
      <SecondaryTab
        isLast={index === groups.length - 1}
        isSelected={isSelected}
        label={pluralName}
      />
    ),
  }));
