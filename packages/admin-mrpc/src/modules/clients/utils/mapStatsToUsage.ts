import { PrivateStatsResponse } from 'multirpc-sdk';

import { IUsageEntityMapped } from '../types';

export const mapStatsToUsage = (
  statsResponse?: PrivateStatsResponse,
): IUsageEntityMapped[] | undefined => {
  return statsResponse?.stats
    ? Object.values(statsResponse?.stats).map(stat => {
        return {
          blockchain: stat?.blockchain || '',
          totalCost: stat?.total?.total_cost || 0,
          details:
            stat?.total?.top_requests?.map(topRequests => {
              return {
                blockchain: stat?.blockchain || '',
                ...topRequests,
                count: topRequests.count.toString(),
                totalCost: topRequests?.total_cost?.toString() || '0',
              };
            }) || [],
        };
      })
    : undefined;
};
