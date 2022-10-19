import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../components/Menu';
import { useLibraryTabs } from './MenuTabsUtils';

interface INearMenuProps {
  group: EndpointGroup;
}

export const NearMenu = ({ group }: INearMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
