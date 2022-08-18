import BigNumber from 'bignumber.js';
import { PrivateStats } from 'multirpc-sdk';
import { useQuery } from '@redux-requests/react';

import { Stats } from '../types';
import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';

export const useStats = (): [Stats, boolean] => {
  const {
    data: {  totalRequests = 0 },
    loading,
  } = useQuery<PrivateStats>({
    defaultData: {},
    type: fetchPrivateStats,
  });

  const stats: Stats = {
    total: new BigNumber(totalRequests),
  };

  return [stats, loading];
};
