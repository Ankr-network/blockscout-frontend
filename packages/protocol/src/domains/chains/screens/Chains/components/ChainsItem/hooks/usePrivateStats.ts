import { useQuery } from '@redux-requests/react';

import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { PrivateStats } from 'multirpc-sdk';

export const usePrivateStats = (chainId: string): [number, boolean] => {
  const {
    data: { stats = {} },
    loading,
  } = useQuery<PrivateStats>({
    defaultData: {},
    type: fetchPrivateStats,
  });

  return [stats[chainId]?.total_requests || 0, loading];
};
