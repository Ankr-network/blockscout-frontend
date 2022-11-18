import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTab } from '../components/SecondaryTab';

export const getGroupTabs = (groups: EndpointGroup[]): Tab<ChainGroupID>[] =>
  groups.map<Tab<ChainGroupID>>(
    ({ id, urlsCount, name, pluralName }, index) => ({
      id,
      title: (isSelected: boolean) => (
        <SecondaryTab
          isLast={index === groups.length - 1}
          isSelected={isSelected}
          label={urlsCount > 1 ? pluralName : name}
        />
      ),
    }),
  );
