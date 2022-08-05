import { Tabs as MuiTabs, TabsProps } from '@material-ui/core';
import { ChangeEvent } from 'react';

import { useTabsStyles } from './useTabsStyles';

type TRestrictedTabsProps = Omit<
  TabsProps,
  'className' | 'indicatorColor' | 'scrollButtons' | 'variant' | 'onChange'
>;

interface ITabsProps extends TRestrictedTabsProps {
  onTabChange(newTab: string): void;
}

export const Tabs = ({
  onTabChange,
  ...restProps
}: ITabsProps): JSX.Element => {
  const classes = useTabsStyles();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: ChangeEvent<{}>, tabValue: string) =>
    onTabChange(tabValue);

  return (
    <MuiTabs
      {...restProps}
      className={classes.tabs}
      indicatorColor="secondary"
      scrollButtons="auto"
      variant="scrollable"
      onChange={handleChange}
    />
  );
};
