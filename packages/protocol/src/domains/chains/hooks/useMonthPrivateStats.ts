import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyChainsFetchMonthPrivateStatsQuery } from '../actions/fetchMonthPrivateStats';

export interface PrivateStatsParams {
  hasCredentials: boolean;
}

export const useMonthPrivateStats = ({
  hasCredentials,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const [fetchMonthPrivateStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthPrivateStatsQuery();

  useEffect(() => {
    if (hasCredentials) {
      fetchMonthPrivateStats();
    }
  }, [hasCredentials, fetchMonthPrivateStats]);

  return [stats, isLoading];
};
