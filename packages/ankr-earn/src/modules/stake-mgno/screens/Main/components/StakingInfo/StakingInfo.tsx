import { t } from '@ankr.com/common';
import { useState } from 'react';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { HistoryTable } from '../HistoryTable';
import { Tabs } from '../Tabs';

export const StakingInfo = (): JSX.Element => {
  const activeStakingText = t('stake-mgno.tabs.active-staking');
  const historyText = t('stake-mgno.tabs.history');

  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  return (
    <div>
      <Tabs activeTab={currentTab} onChangeTab={handleChangeTab} />

      {currentTab === activeStakingText && <ActiveStakingTable />}

      {currentTab === historyText && <HistoryTable />}
    </div>
  );
};
