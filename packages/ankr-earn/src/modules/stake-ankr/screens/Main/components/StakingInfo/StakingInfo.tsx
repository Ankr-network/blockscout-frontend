import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { ClaimAllUnstakesDialog } from '../ClaimAllUnstakesDialog';
import { HistoryTable } from '../HistoryTable';
import { Tabs } from '../Tabs';
import { UnstakingTable } from '../UnstakingTable';

import { useClaim } from './useClaim';

export const StakingInfo = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const { data: unstakingData } = useQuery({
    type: getUnstakingData,
  });

  const {
    isFewClaims,
    isSingleClaim,
    data,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    isOpened,
    onClose,
    onOpen,
    onClaim,
  } = useClaim();

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount, setUnstakingAmount] = useState(
    unstakingData?.length ?? 0,
  );
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  useProviderEffect(() => {
    dispatchRequest(getUnstakingData());
    setUnstakingAmount(unstakingData?.length ?? 0);
  }, [dispatchRequest]);

  useEffect(() => {
    setUnstakingAmount(unstakingData?.length ?? 0);
  }, [unstakingData]);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);
  const isActiveUnstakingTab = currentTab === unstakingText;

  const isShowingButton =
    isActiveUnstakingTab && !loading && !!data && data.length >= 1;

  const isExistsUnstakingData = !!unstakingData && unstakingData.length > 0;

  return (
    <div>
      <Tabs
        activeTab={currentTab}
        isExistsUnstakingData={isExistsUnstakingData}
        isShowingButton={isShowingButton}
        newUnstakingAmount={newUnstakingAmount}
        onChangeTab={handleChangeTab}
        onOpen={onOpen}
      />

      {currentTab === activeStakingText && <ActiveStakingTable />}

      {currentTab === unstakingText && <UnstakingTable />}

      {currentTab === historyText && <HistoryTable />}

      <ClaimAllUnstakesDialog
        data={data}
        isClaimsLoading={isClaimsLoading}
        isFewClaims={isFewClaims}
        isSingleClaim={isSingleClaim}
        loading={loading}
        open={isOpened}
        total={total}
        totalUSD={totalUSD}
        onClaim={onClaim}
        onClose={onClose}
      />
    </div>
  );
};
