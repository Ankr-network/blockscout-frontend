import { RoutesConfig } from 'modules/stake-ankr/Routes';

import { ActiveStakingTable } from '../ActiveStakingTable';
import { HistoryTable } from '../HistoryTable';
import { Tabs } from '../Tabs';
import { UnstakingTable } from '../UnstakingTable';

import { useStakingInfo } from './useStakingInfo';

export const StakingInfo = (): JSX.Element => {
  const {
    data,
    loading,
    unstakingData,
    currentTab,
    newUnstakingAmount,
    activeStakingText,
    unstakingText,
    historyText,
    handleChangeTab,
  } = useStakingInfo();

  const isActiveUnstakingTab = currentTab === unstakingText;

  const isShowingButton =
    isActiveUnstakingTab && !loading && !!data && data.length >= 1;

  const isExistsUnstakingData = !!unstakingData && unstakingData.length > 0;

  return (
    <div>
      <Tabs
        activeTab={currentTab}
        claimAllLink={RoutesConfig.claimAllUnstakes.generatePath()}
        isExistsUnstakingData={isExistsUnstakingData}
        isShowingButton={isShowingButton}
        newUnstakingAmount={newUnstakingAmount}
        onChangeTab={handleChangeTab}
      />

      {currentTab === activeStakingText && <ActiveStakingTable />}

      {currentTab === unstakingText && <UnstakingTable />}

      {currentTab === historyText && <HistoryTable />}
    </div>
  );
};
