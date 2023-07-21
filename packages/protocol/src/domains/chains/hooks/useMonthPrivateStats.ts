import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyChainsFetchMonthPrivateStatsQuery } from '../actions/private/fetchMonthPrivateStats';

export const useMonthPrivateStats = (): [PrivateStats, boolean] => {
  const [fetchMonthPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthPrivateStatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    fetchMonthPrivateStats({ group });
  }, [fetchMonthPrivateStats, group]);

  return [stats, isLoading];
};
