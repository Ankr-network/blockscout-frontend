import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyChainsFetchMonthPrivateStatsQuery } from '../actions/private/fetchMonthPrivateStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useMonthPrivateStats = (): [PrivateStats, boolean] => {
  const [fetchMonthPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthPrivateStatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    fetchMonthPrivateStats({ group });
  }, [fetchMonthPrivateStats, group]);

  return [stats, isLoading];
};
