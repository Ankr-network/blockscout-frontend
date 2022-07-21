import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { HistoryTable } from '../HistoryTable';
import { ITabItem, Tabs } from '../Tabs';
import { UnstakingTable } from '../UnstakingTable';

export const StakingInfo = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const { data } = useQuery({
    type: getUnstakingData,
  });

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount, setUnstakingAmount] = useState(data?.length ?? 0);
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  useProviderEffect(() => {
    dispatchRequest(getUnstakingData());
    setUnstakingAmount(data?.length ?? 0);
  }, [data, dispatchRequest]);

  useEffect(() => {
    setUnstakingAmount(data?.length ?? 0);
  }, [data]);

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
