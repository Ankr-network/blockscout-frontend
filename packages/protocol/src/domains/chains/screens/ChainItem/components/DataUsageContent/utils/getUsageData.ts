import BigNumber from 'bignumber.js';
import { PrivateStat } from 'multirpc-sdk';

import { PublicStats, UsageData } from '../types';
import { StatsTimeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';

export interface UsageDataParams {
  arePrivateStatsLoading: boolean;
  isConnecting: boolean;
  isWalletConnected: boolean;
  privateStats: PrivateStat;
  publicStats: PublicStats;
  userTopRequests: TopRequestsResultData;
  userTopRequestsIp: UserRequestsByIpData[];
  setStatsTimeframe: (timeframe: StatsTimeframe) => void;
  statsTimeframe: StatsTimeframe;
}

export const getUsageData = ({
  arePrivateStatsLoading,
  isConnecting,
  isWalletConnected,
  privateStats = {} as PrivateStat,
  publicStats: {
    countries,
    error: publicStatsError,
    loading: arePublicStatsLoading,
    pristine,
    totalCached,
    totalRequests: publicTotalRequests,
    totalRequestsHistory: publicTotalRequestsHistory,
  },
  userTopRequests,
  userTopRequestsIp,
  setStatsTimeframe: setTimeframe,
  statsTimeframe: timeframe,
}: UsageDataParams): UsageData => {
  const publicUsageData: UsageData = {
    countries,
    error: publicStatsError,
    isConnecting,
    isWalletConnected,
    loading: arePublicStatsLoading || isConnecting,
    pristine,
    setTimeframe,
    timeframe,
    totalCached,
    totalRequests: publicTotalRequests,
    totalRequestsHistory: publicTotalRequestsHistory,
    userTopRequests: undefined,
    userTopRequestsIp: undefined,
  };

  const {
    total_requests: privateTotalRequests = 0,
    counts: privateTotalRequestsHistory = {},
  } = privateStats;

  const privateUsageData: UsageData = {
    countries: undefined,
    error: undefined,
    isConnecting,
    isWalletConnected,
    loading: arePrivateStatsLoading || isConnecting,
    pristine: false,
    setTimeframe,
    timeframe,
    totalCached: new BigNumber(0),
    totalRequests: new BigNumber(privateTotalRequests),
    totalRequestsHistory: Object.fromEntries(
      Object.entries(privateTotalRequestsHistory).map(
        ([timestamp, { count }]) => [timestamp, count],
      ),
    ),
    userTopRequests,
    userTopRequestsIp,
  };

  return isWalletConnected ? privateUsageData : publicUsageData;
};
