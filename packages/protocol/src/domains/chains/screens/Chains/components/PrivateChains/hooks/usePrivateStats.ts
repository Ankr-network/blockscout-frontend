import { PrivateStatsInternal } from 'multirpc-sdk';

import { chainsFetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateStats = (): [PrivateStatsInternal, boolean] => {
  const [, { data: { stats = {} } = {}, isLoading }] = useQueryEndpoint(
    chainsFetchPrivateStats,
  );

  return [stats, isLoading];
};
