import { useQuery } from '@redux-requests/react';
import { useEffect, useState } from 'react';

import { t } from 'common';

import { getStakersData } from 'modules/referrals/actions/getStakersData';

export enum EReferralTabs {
  referrals = 'referrals',
  history = 'history',
}

interface IUseReferralTables {
  referralsAmount?: number;
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

  const { data: stakersData } = useQuery({
    type: getStakersData,
  });

  const [search, setSearch] = useState('');

  const [currentTab, setCurrentTab] = useState<string>(EReferralTabs.referrals);

  useEffect(() => {
    setSearch('');
  }, [currentTab]);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);
  const handleChangeSearch = (value: string) => setSearch(value);

  return {
    currentTab,
    referralsAmount: stakersData?.length ?? undefined,
    referralsText,
    claimHistoryText,
    searchValue: search,
    handleChangeSearch,
    handleChangeTab,
  };
};
