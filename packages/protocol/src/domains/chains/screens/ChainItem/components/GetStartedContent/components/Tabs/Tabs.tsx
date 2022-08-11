import React from 'react';

import { TabsManager } from 'uiKit/TabsManager';
import { Technology } from '../../types';
import { tabs, title } from './const';

import { useStyles } from './TabsStyles';
import { useTabs } from 'modules/common/hooks/useTabs';

export interface TabsProps {
  setTechnology: (technology: Technology) => void;
}

export const Tabs = ({ setTechnology }: TabsProps) => {
  const [processedTabs, selectedTab] = useTabs({
    tabs,
    onTabSelect: setTechnology,
  });

  const classes = useStyles();

  return (
    <TabsManager<Technology>
      selectedTab={selectedTab}
      tabs={processedTabs}
      title={<div className={classes.title}>{title}</div>}
    />
  );
};
