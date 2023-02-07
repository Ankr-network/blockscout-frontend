import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyChainsFetchMonthPrivateStatsQuery } from '../actions/private/fetchMonthPrivateStats';

export const useMonthPrivateStats = (): [PrivateStats, boolean] => {
  const [fetchMonthPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthPrivateStatsQuery();

  useEffect(() => {
    fetchMonthPrivateStats();
  }, [fetchMonthPrivateStats]);

  return [stats, isLoading];
};
