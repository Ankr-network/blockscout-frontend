import { EndpointGroup } from 'modules/endpoints/types';

import { useLibraryTabs } from './MenuTabsUtils';
import { Menu } from '../../../../Menu';

interface IEVMMenuProps {
  group: EndpointGroup;
}

export const CChainMenu = ({ group }: IEVMMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
