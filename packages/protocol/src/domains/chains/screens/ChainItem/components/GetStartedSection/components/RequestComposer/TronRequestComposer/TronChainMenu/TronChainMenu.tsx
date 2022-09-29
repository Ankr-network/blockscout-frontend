import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../components/Menu';
import { useLibraryTabs } from './MenuTabsUtils';

interface ITronMenuProps {
  group: EndpointGroup;
}

export const TronChainMenu = ({ group }: ITronMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
