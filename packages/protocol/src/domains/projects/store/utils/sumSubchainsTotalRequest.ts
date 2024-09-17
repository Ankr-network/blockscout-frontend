import { PrivateStats } from 'multirpc-sdk';
import { ChainPath } from '@ankr.com/chains-list';

export const sumSubchainsTotalRequest = (
  relatedPaths: ChainPath[],
  data?: PrivateStats,
) => {
  return relatedPaths.reduce((acc, id) => {
    const totalRequests = Number(data?.stats?.[id]?.total_requests || 0);

    return acc + totalRequests;
  }, 0);
};
