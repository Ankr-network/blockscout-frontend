import BigNumber from 'bignumber.js';

import { Stats } from '../types';
import { chainsFetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useStats = (): [Stats, boolean] => {
  const [, { data: { totalRequests = 0 } = {}, isLoading }] = useQueryEndpoint(
    chainsFetchPrivateStats,
  );

  const stats: Stats = {
    total: new BigNumber(totalRequests),
  };

  return [stats, isLoading];
};
