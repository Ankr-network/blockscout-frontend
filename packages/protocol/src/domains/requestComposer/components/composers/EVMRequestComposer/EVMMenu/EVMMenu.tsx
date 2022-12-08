import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../../Menu';
import { useLibraryTabs } from './MenuTabsUtils';

interface IEVMMenuProps {
  group: EndpointGroup;
}

export const EVMMenu = ({ group }: IEVMMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return (
    <Menu selectedTab={selectedTab} tabs={tabs} tabsOrientation="vertical" />
  );
};
