import { ClaimHistoryTable } from '../ClaimHistoryTable';
import { ReferralsTable } from '../ReferralsTable';
import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';
import { TotalClaimed } from '../TotalClaimed';

import { EReferralTabs, useReferralTables } from './useReferralTables';

export const ReferralTables = (): JSX.Element => {
  const {
    currentTab,
    referralsAmount,
    referralsText,
    claimHistoryText,
    handleChangeTab,
  } = useReferralTables();

  return (
    <>
      <Tabs activeTab={currentTab} onChangeTab={handleChangeTab}>
        <Tab
          key={EReferralTabs.referrals}
          activeTab={currentTab}
          amount={referralsAmount}
          title={referralsText}
          value={EReferralTabs.referrals}
        />

        <Tab
          key={EReferralTabs.history}
          activeTab={currentTab}
          title={claimHistoryText}
          value={EReferralTabs.history}
        />
      </Tabs>

      {currentTab === EReferralTabs.referrals && <ReferralsTable />}

      {currentTab === EReferralTabs.history && (
        <>
          <TotalClaimed />

          <ClaimHistoryTable />
        </>
      )}
    </>
  );
};
