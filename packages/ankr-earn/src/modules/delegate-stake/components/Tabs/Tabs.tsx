import { Chip, Typography, Tab, Tabs as BaseTabs } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { useTabsStyles } from './useTabsStyles';

export interface ITabItem {
  title: string;
  amount?: number;
  showAmount?: boolean;
}

interface ITabsProps {
  tabs: ITabItem[];
  activeTab: string;
  buttonSlot?: JSX.Element;
  handleChangeTab(newTab: string): void;
}

export const Tabs = ({
  tabs,
  activeTab,
  buttonSlot,
  handleChangeTab,
}: ITabsProps): JSX.Element => {
  const classes = useTabsStyles();

  return (
    <div className={classes.root}>
      <BaseTabs
        className={classes.tabs}
        indicatorColor="secondary"
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
        onChange={(_, value) => handleChangeTab(value)}
      >
        {tabs.map(({ title, showAmount, amount }: ITabItem): ReactNode => {
          const isActiveTab = title === activeTab;

          return (
            <Tab
              key={title}
              classes={{ root: classes.tabArea, selected: classes.tabSelected }}
              className={classes.tabArea}
              label={
                <div className={classes.itemWrapper}>
                  <Typography
                    className={classNames(classes.tabText, {
                      [classes.tabActive]: isActiveTab,
                    })}
                    color={isActiveTab ? 'initial' : 'textSecondary'}
                    variant="h3"
                  >
                    {title}
                  </Typography>

                  {!!amount && showAmount && (
                    <Chip
                      classes={{ label: classes.chipLabel }}
                      className={classes.chip}
                      color="primary"
                      label={amount}
                      size="small"
                    />
                  )}
                </div>
              }
              value={title}
            />
          );
        })}
      </BaseTabs>

      {buttonSlot}
    </div>
  );
};
