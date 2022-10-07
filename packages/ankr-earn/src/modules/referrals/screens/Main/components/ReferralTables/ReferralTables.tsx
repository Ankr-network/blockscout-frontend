import { ClaimHistoryTable } from '../ClaimHistoryTable';
import { ReferralsTable } from '../ReferralsTable';
import { SearchField } from '../SearchField';
import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';
import { TotalClaimed } from '../TotalClaimed';

import { EReferralTabs, useReferralTables } from './useReferralTables';
import { useReferralTablesStyles } from './useReferralTablesStyles';

export const ReferralTables = (): JSX.Element => {
  const classes = useReferralTablesStyles();

  const {
    currentTab,
    referralsAmount,
    referralsText,
    claimHistoryText,
    searchValue,
    handleChangeSearch,
    handleChangeTab,
  } = useReferralTables();

  return (
    <>
      <div className={classes.root}>
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

        {currentTab === EReferralTabs.referrals && (
          <SearchField
            handleChangeSearch={handleChangeSearch}
            value={searchValue}
          />
        )}
      </div>

      {currentTab === EReferralTabs.referrals && (
        <ReferralsTable searchAddress={searchValue} />
      )}

      {currentTab === EReferralTabs.history && (
        <>
          <TotalClaimed />

          <ClaimHistoryTable />
        </>
      )}
    </>
  );
};
