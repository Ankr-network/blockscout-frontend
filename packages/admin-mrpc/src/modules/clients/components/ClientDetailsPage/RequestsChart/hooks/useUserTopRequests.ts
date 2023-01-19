import { PrivateStatsInternal } from 'multirpc-sdk';
import { Timeframe } from '../types';

import { formatChartData } from '../utils/userTopRequestsUtils';
import { useTimeframe } from './useTimeframe';

interface IUserTopRequestsParam {
  privateStats: PrivateStatsInternal;
  chainId: string;
  timeframe: Timeframe;
}

const getUserTopRequests = ({
  privateStats,
  chainId,
  timeframe,
}: IUserTopRequestsParam) => {
  if (privateStats && chainId in privateStats) {
    const chainData = privateStats[chainId];
    const { counts, total } = chainData || {};

    const { chartData, listData } = formatChartData(timeframe, total, counts);

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
  timeframe: timeframe_,
}: IUserTopRequestsParam) => {
  const { timeframe } = useTimeframe(timeframe_, [privateStats[chainId]]);

  return getUserTopRequests({
    privateStats,
    chainId,
    timeframe,
  });
};
