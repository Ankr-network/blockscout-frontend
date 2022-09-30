import { useLibraryTabs } from './MenuTabsUtils';
import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../../components/Menu';

interface IPChainMenuProps {
  group: EndpointGroup;
}

export const PChainMenu = ({ group }: IPChainMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
