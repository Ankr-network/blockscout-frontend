import { PrivateStatsInternal } from 'multirpc-sdk';

import { fetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateStats = (): [PrivateStatsInternal, boolean] => {
  const [, { data: { stats = {} } = {}, isLoading }] =
    useQueryEndpoint(fetchPrivateStats);

  return [stats, isLoading];
};
