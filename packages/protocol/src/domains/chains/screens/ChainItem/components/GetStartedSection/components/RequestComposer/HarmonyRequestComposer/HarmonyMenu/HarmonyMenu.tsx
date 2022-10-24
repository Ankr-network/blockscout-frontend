import { Menu } from '../../components/Menu';
import { ITabProps } from 'modules/common/hooks/useTabs';

export const HarmonyMenu = ({ tabs, selectedTab }: ITabProps) => {
  return <Menu selectedTab={selectedTab} tabs={tabs} />;
};
