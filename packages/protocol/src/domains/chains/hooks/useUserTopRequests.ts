import { PrivateStatsInternal } from 'multirpc-sdk';
import { StatsTimeframe } from '../types';
import { formatChartData } from '../utils/userTopRequestsUtils';
import { useTimeframe } from './useStatsTimeframe';

interface IUserTopRequestsParam {
  privateStats: PrivateStatsInternal;
  chainId: string;
  statsTimeframe: StatsTimeframe;
}

const getUserTopRequests = ({
  privateStats,
  chainId,
  statsTimeframe,
}: IUserTopRequestsParam) => {
  if (privateStats && chainId in privateStats) {
    const chainData = privateStats[chainId];
    const { counts, total } = chainData;

    const { chartData, listData } = formatChartData(
      total,
      counts,
      statsTimeframe,
    );

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

export const useUserTopRequests = ({
  privateStats,
  chainId,
  statsTimeframe: statsTimeframe_,
}: IUserTopRequestsParam) => {
  const { timeframe } = useTimeframe(statsTimeframe_, [privateStats[chainId]]);

  return getUserTopRequests({
    privateStats,
    chainId,
    statsTimeframe: timeframe,
  });
};
