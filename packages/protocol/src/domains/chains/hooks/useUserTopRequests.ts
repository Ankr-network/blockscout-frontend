import { PrivateStatsInternal, TopRequestsData } from 'multirpc-sdk';
import { StatsTimeframe } from '../types';
import { formatChartData, formatListData } from '../utils/userTopRequestsUtils';

export const useUserTopRequests = (
  privateStats: PrivateStatsInternal,
  chainId: string,
  statsTimeframe: StatsTimeframe,
) => {
  if (privateStats && chainId in privateStats) {
    const chainData = privateStats[chainId];
    const { counts } = chainData;

    const chartData: TopRequestsData[] = formatChartData(
      counts,
      statsTimeframe,
    );
    const listData: string[] = formatListData(chartData);

    const result = {
      list: listData,
      data: chartData,
    };

    return result;
  }

  return {
    list: [],
    data: [],
  };
};
