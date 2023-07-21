import { ITabProps } from 'modules/common/hooks/useTabs';

import { Menu } from '../../../Menu';

export const HarmonyMenu = ({ tabs, selectedTab }: ITabProps) => {
  return <Menu orientation="vertical" selectedTab={selectedTab} tabs={tabs} />;
};
