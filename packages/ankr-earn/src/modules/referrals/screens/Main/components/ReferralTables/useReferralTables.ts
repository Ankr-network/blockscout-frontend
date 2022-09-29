import { useEffect, useState } from 'react';

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
  searchValue: string;
  handleChangeSearch: (value: string) => void;
  handleChangeTab: (newTab: string) => void;
}

export const useReferralTables = (): IUseReferralTables => {
  const referralsText = t('referrals.tabs.referrals');
  const claimHistoryText = t('referrals.tabs.claim-history');

  const [newUnstakingAmount] = useState(2);
  const [search, setSearch] = useState('');

  const [currentTab, setCurrentTab] = useState<string>(EReferralTabs.referrals);

  useEffect(() => {
    setSearch('');
  }, [currentTab]);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);
  const handleChangeSearch = (value: string) => setSearch(value);

  return {
    currentTab,
    referralsAmount: newUnstakingAmount,
    referralsText,
    claimHistoryText,
    searchValue: search,
    handleChangeSearch,
    handleChangeTab,
  };
};
