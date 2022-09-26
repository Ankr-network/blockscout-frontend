import { useState } from 'react';

import { t } from 'common';

export enum EReferralTabs {
  referrals = 'referrals',
  history = 'history',
}

interface IUseReferralTables {
  referralsAmount: number;
  currentTab: string;
  referralsText: string;
  claimHistoryText: string;
  handleChangeTab: (newTab: string) => void;
}

export const useReferralTables = (): IUseReferralTables => {
  const referralsText = t('referrals.tabs.referrals');
  const claimHistoryText = t('referrals.tabs.claim-history');

  const [newUnstakingAmount] = useState(2);

  const [currentTab, setCurrentTab] = useState<string>(EReferralTabs.referrals);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  return {
    currentTab,
    referralsAmount: newUnstakingAmount,
    referralsText,
    claimHistoryText,
    handleChangeTab,
  };
};
