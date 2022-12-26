import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyChainsFetchMonthPrivateStatsQuery } from '../actions/fetchMonthPrivateStats';

export interface PrivateStatsParams {
  hasPrivateAccess: boolean;
}

export const useMonthPrivateStats = ({
  hasPrivateAccess,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const [fetchMonthPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthPrivateStatsQuery();

  useEffect(() => {
    if (hasPrivateAccess) {
      fetchMonthPrivateStats();
    }
  }, [hasPrivateAccess, fetchMonthPrivateStats]);

  return [stats, isLoading];
};
