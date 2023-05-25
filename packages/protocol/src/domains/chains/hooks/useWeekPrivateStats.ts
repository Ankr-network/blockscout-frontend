import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyChainsFetchWeekPrivateStatsQuery } from '../actions/private/fetchWeekPrivateStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useWeekPrivateStats = (): [PrivateStats, boolean] => {
  const [fetchWeekPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchWeekPrivateStatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    fetchWeekPrivateStats({ group });
  }, [fetchWeekPrivateStats, group]);

  return [stats, isLoading];
};
