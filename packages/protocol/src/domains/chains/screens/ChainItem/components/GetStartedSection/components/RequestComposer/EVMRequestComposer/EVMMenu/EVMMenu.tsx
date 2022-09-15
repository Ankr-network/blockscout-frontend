import { useLibraryTabs } from './MenuTabsUtils';
import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../components/Menu';

interface IEVMMenuProps {
  group: EndpointGroup;
}

export const EVMMenu = ({ group }: IEVMMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
