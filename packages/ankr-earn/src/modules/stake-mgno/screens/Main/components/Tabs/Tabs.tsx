import { Tabs as BaseTabs, Tab } from '@material-ui/core';

import { t } from 'common';

import { TabContent } from 'modules/delegate-stake/components/TabContent';

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
            <TabContent
              activeTab={activeTab}
              title={activeStakingText}
              value={activeStakingText}
            />
          }
          value={activeStakingText}
        />

        <Tab
          key={historyText}
          classes={{ root: classes.tabArea, selected: classes.tabSelected }}
          className={classes.tabArea}
          label={
            <TabContent
              activeTab={activeTab}
              title={historyText}
              value={historyText}
            />
          }
          value={historyText}
        />
      </BaseTabs>
    </div>
  );
};
