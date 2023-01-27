import { chainsFetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateStats = (chainId: string): [number, boolean] => {
  const [, { data: { stats = {} } = {}, isLoading }] = useQueryEndpoint(
    chainsFetchPrivateStats,
  );

  return [stats[chainId]?.total_requests || 0, isLoading];
};
