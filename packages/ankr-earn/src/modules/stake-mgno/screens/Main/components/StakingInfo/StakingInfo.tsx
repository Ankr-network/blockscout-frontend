import { useState } from 'react';

import { t } from 'common';

import { ITabItem } from 'modules/delegate-stake/components/Tabs';

import { Tabs } from '../Tabs';

export const StakingInfo = (): JSX.Element => {
  const activeStakingText = t('stake-mgno.tabs.active-staking');
  const historyText = t('stake-mgno.tabs.history');

  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  const tabs: ITabItem[] = [
    {
      title: activeStakingText,
    },
    {
      title: historyText,
    },
  ];

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  return (
    <div>
      <Tabs
        activeTab={currentTab}
        handleChangeTab={handleChangeTab}
        tabs={tabs}
      />

      {currentTab === activeStakingText && <>staking</>}

      {currentTab === historyText && <>history</>}
    </div>
  );
};
