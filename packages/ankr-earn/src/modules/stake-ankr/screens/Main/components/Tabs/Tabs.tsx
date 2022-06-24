import { Chip, Typography, Tab, Tabs as BaseTabs } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { useTabsStyles } from './useTabsStyles';

export interface ITabItem {
  title: string;
  showAmount: boolean;
}

interface ITabProps {
  tabs: ITabItem[];
  activeTab: string;
  unstakingAmount?: number;
  claimAllLink?: string;
  handleChangeTab(newTab: string): void;
}

export const Tabs = ({
  tabs,
  activeTab,
  unstakingAmount,
  claimAllLink,
  handleChangeTab,
}: ITabProps): JSX.Element => {
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
        {tabs.map(({ title, showAmount }: ITabItem): ReactNode => {
          const isActiveTab: boolean = title === activeTab;

          return (
            <Tab
              classes={{ root: classes.tabArea, selected: classes.tabSelected }}
              className={classes.tabArea}
              label={title}
              value={title}
            >
              <Typography
                className={classNames(classes.tabText, {
                  [classes.tabActive]: isActiveTab,
                })}
                color={isActiveTab ? 'initial' : 'textSecondary'}
                variant="h3"
              >
                {title}
              </Typography>

              {unstakingAmount && showAmount && (
                <Chip
                  className={classes.chip}
                  color="primary"
                  label={unstakingAmount}
                  size="small"
                />
              )}
            </Tab>
          );
        })}
      </BaseTabs>

      {claimAllLink && (
        <NavLink className={classes.btn} href={claimAllLink} variant="outlined">
          {t('stake-ankr.tabs.claim-all')}
        </NavLink>
      )}
    </div>
  );
};
