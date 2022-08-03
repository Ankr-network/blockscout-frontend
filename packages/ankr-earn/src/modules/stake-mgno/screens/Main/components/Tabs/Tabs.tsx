import { Typography, Tabs as BaseTabs, Tab } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { useTabsStyles } from './useTabsStyles';

interface ITabProps {
  activeTab: string;
  onChangeTab(newTab: string): void;
}

export const Tabs = ({ activeTab, onChangeTab }: ITabProps): JSX.Element => {
  const classes = useTabsStyles();

  const activeStakingText = t('stake-mgno.tabs.active-staking');
  const historyText = t('stake-mgno.tabs.history');

  return (
    <div className={classes.root}>
      <BaseTabs
        className={classes.tabs}
        indicatorColor="secondary"
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
        onChange={(_, value) => onChangeTab(value)}
      >
        <Tab
          key={activeStakingText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <div className={classes.itemWrapper}>
              <Typography
                className={classNames(classes.tabText, {
                  [classes.tabActive]: activeTab === activeStakingText,
                })}
                color={
                  activeTab === activeStakingText
                    ? 'textPrimary'
                    : 'textSecondary'
                }
                variant="h3"
              >
                {activeStakingText}
              </Typography>
            </div>
          }
          value={activeStakingText}
        />

        <Tab
          key={historyText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <div className={classes.itemWrapper}>
              <Typography
                className={classNames(classes.tabText, {
                  [classes.tabActive]: activeTab === historyText,
                })}
                color={
                  activeTab === historyText ? 'textPrimary' : 'textSecondary'
                }
                variant="h3"
              >
                {historyText}
              </Typography>
            </div>
          }
          value={historyText}
        />
      </BaseTabs>
    </div>
  );
};
