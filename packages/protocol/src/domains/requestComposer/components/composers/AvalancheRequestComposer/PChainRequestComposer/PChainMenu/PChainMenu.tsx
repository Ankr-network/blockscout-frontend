import { EndpointGroup } from 'modules/endpoints/types';

import { useLibraryTabs } from './MenuTabsUtils';
import { Menu } from '../../../../Menu';

interface IPChainMenuProps {
  group: EndpointGroup;
}

export const PChainMenu = ({ group }: IPChainMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
