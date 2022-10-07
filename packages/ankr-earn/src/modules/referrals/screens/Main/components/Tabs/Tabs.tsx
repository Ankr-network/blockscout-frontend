import { Tabs as MuiTabs } from '@material-ui/core';
import { ChangeEvent, ReactNode } from 'react';

import { useTabsStyles } from './useTabsStyles';

interface ITabsProps {
  activeTab: string;
  children: ReactNode;
  onChangeTab(newTab: string): void;
}

export const Tabs = ({
  activeTab,
  children,
  onChangeTab,
}: ITabsProps): JSX.Element => {
  const classes = useTabsStyles();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: ChangeEvent<{}>, tabValue: string) =>
    onChangeTab(tabValue);

  return (
    <div className={classes.root}>
      <MuiTabs
        className={classes.tabs}
        indicatorColor="secondary"
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
        onChange={handleChange}
      >
        {children}
      </MuiTabs>
    </div>
  );
};
