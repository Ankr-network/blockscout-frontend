import { EndpointGroup } from 'modules/endpoints/types';
import { Menu } from '../../components/Menu';
import { useLibraryTabs } from './hooks/useLibraryTabs';

export interface SolanaMenuProps {
  group: EndpointGroup;
}

export const SolanaMenu = ({ group }: SolanaMenuProps) => {
  const [tabs, selectedTab] = useLibraryTabs(group);

  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
