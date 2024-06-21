import { ITabProps } from 'modules/common/hooks/useTabs';

import { Menu } from '../../../Menu';

export const HarmonyMenu = ({ selectedTab, tabs }: ITabProps) => {
  return <Menu orientation="vertical" selectedTab={selectedTab} tabs={tabs} />;
};
