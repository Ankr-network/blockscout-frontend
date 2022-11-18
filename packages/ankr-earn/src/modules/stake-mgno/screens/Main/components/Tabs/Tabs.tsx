import { t } from '@ankr.com/common';

import { Tab, Tabs as BaseTabs } from 'modules/delegate-stake/components/Tabs';

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
      <BaseTabs value={activeTab} onTabChange={onChangeTab}>
        <Tab
          key={activeStakingText}
          activeTab={activeTab}
          title={activeStakingText}
          value={activeStakingText}
        />

        <Tab
          key={historyText}
          activeTab={activeTab}
          title={historyText}
          value={historyText}
        />
      </BaseTabs>
    </div>
  );
};
