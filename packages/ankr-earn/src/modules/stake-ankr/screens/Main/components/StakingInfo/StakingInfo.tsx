import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
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
  const { data: ankrPrice } = useQuery({ type: getANKRPrice });

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount, setUnstakingAmount] = useState(data?.length ?? 0);
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  useProviderEffect(() => {
    dispatchRequest(
      getUnstakingData({
        usdPrice: ankrPrice ?? ZERO,
      }),
    );
    setUnstakingAmount(data?.length ?? 0);
  }, [dispatchRequest]);

  useEffect(() => {
    setUnstakingAmount(data?.length ?? 0);
  }, [data]);

  const tabs: ITabItem[] = [
    {
      title: activeStakingText,
      showAmount: false,
    },
    newUnstakingAmount
      ? {
          title: unstakingText,
          showAmount: true,
        }
      : null,
    {
      title: historyText,
      showAmount: false,
    },
  ].filter(tab => tab !== null) as ITabItem[];

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
