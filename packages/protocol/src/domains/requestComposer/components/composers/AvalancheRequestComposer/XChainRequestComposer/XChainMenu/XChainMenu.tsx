import { useLibraryTabs } from './MenuTabsUtils';
import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../../../Menu';

interface IXChainMenuProps {
  group: EndpointGroup;
}

export const XChainMenu = ({ group }: IXChainMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
