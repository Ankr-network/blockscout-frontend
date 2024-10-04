import BigNumber from 'bignumber.js';

import { fetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { Stats } from '../types';

export const useStats = (): [Stats, boolean] => {
  const [, { data: { totalRequests = 0 } = {}, isLoading }] =
    useQueryEndpoint(fetchPrivateStats);

  const stats: Stats = {
    total: new BigNumber(totalRequests),
  };

  return [stats, isLoading];
};
