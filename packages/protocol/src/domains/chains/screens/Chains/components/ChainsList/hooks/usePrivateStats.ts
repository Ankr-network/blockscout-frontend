import { PrivateStats, PrivateStatsInternal } from 'multirpc-sdk';
import { useQuery } from '@redux-requests/react';

import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';

export const usePrivateStats = (): [PrivateStatsInternal, boolean] => {
  const {
    data: { stats = {} },
    loading,
  } = useQuery<PrivateStats>({
    defaultData: {},
    type: fetchPrivateStats,
  });

  return [stats, loading];
};
