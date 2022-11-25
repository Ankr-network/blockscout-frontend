import { PrivateStats } from 'multirpc-sdk';
import { IUsageEntityMapped } from '../types';

export const mapStatsToUsage = (
  statsResponse?: PrivateStats,
): IUsageEntityMapped[] | undefined => {
  return statsResponse?.stats
    ? Object.values(statsResponse?.stats).map(stat => {
        return {
          blockchain: stat?.blockchain || '',
          totalCost: stat?.total?.totalCost || 0,
          details:
            stat?.total?.topRequests?.map(topRequests => {
              return {
                blockchain: stat?.blockchain || '',
                ...topRequests,
                count: topRequests.count.toString(),
                totalCost: topRequests?.totalCost?.toString() || '0',
              };
            }) || [],
        };
      })
    : undefined;
};
