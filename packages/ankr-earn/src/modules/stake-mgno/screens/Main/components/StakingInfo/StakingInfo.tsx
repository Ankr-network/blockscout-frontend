import { useState } from 'react';

import { t } from 'common';

import { Tabs } from '../Tabs';

export const StakingInfo = (): JSX.Element => {
  const activeStakingText = t('stake-mgno.tabs.active-staking');
  const historyText = t('stake-mgno.tabs.history');

  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  return (
    <div>
      <Tabs activeTab={currentTab} onChangeTab={handleChangeTab} />

      {currentTab === activeStakingText && <>staking</>}

      {currentTab === historyText && <>history</>}
    </div>
  );
};
