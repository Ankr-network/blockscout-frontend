import React from 'react';

import { TabsManager } from 'uiKit/TabsManager';
import { Technology } from '../../types';
import { tabs, title } from './const';

import { useStyles } from './TabsStyles';

export interface TabsProps {
  setTechnology: (technology: Technology) => void;
}

export const Tabs = ({ setTechnology }: TabsProps) => {
  const classes = useStyles();

  return (
    <TabsManager<Technology>
      onTabSelect={setTechnology}
      tabs={tabs}
      title={<div className={classes.title}>{title}</div>}
    />
  );
};
