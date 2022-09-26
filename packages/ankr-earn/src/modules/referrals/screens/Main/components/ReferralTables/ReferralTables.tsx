import { TabContext } from '@material-ui/lab';
import TabPanel from '@material-ui/lab/TabPanel';

import { t } from 'common';

import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';

import { EReferralTabs, useReferralTables } from './useReferralTables';

export const ReferralTables = (): JSX.Element => {
  const { currentTab, referralsAmount, handleChangeTab } = useReferralTables();

  return (
    <TabContext value={currentTab}>
      <Tabs activeTab={currentTab} onChangeTab={handleChangeTab}>
        <Tab
          activeTab={currentTab}
          amount={referralsAmount}
          title={t('referrals.tabs.referrals')}
          value={EReferralTabs.referrals}
        />

        <Tab
          activeTab={currentTab}
          title={t('referrals.tabs.claim-history')}
          value={EReferralTabs.history}
        />
      </Tabs>

      <TabPanel value={EReferralTabs.referrals}>referralsText</TabPanel>

      <TabPanel value={EReferralTabs.history}>claimHistoryText</TabPanel>
    </TabContext>
  );
};
