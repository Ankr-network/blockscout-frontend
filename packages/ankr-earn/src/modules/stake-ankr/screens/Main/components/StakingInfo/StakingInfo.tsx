import { useState } from 'react';

import { t } from 'common';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { HistoryTable } from '../HistoryTable';
import { ITabItem, Tabs } from '../Tabs';
import { UnstakingTable } from '../UnstakingTable';

export const StakingInfo = (): JSX.Element => {
  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount] = useState(3);
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  const tabs: ITabItem[] = [
    {
      title: activeStakingText,
      showAmount: false,
    },
    {
      title: unstakingText,
      showAmount: true,
    },
    {
      title: historyText,
      showAmount: false,
    },
  ];

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  return (
    <div>
      <Tabs
        activeTab={currentTab}
        claimAllLink={currentTab === unstakingText ? 'claimLink' : ''}
        handleChangeTab={handleChangeTab}
        tabs={tabs}
        unstakingAmount={newUnstakingAmount}
      />

      {currentTab === activeStakingText && <ActiveStakingTable />}

      {currentTab === unstakingText && <UnstakingTable />}

      {currentTab === historyText && <HistoryTable />}
    </div>
  );
};
