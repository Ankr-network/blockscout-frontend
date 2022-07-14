import BigNumber from 'bignumber.js';
import { PrivateStat } from 'multirpc-sdk';

import { PublicStats, UsageData } from '../types';
import { StatsTimeframe } from 'domains/chains/types';

export interface UsageDataParams {
  arePrivateStatsLoading: boolean;
  isWalletConnected: boolean;
  privateStats: PrivateStat;
  publicStats: PublicStats;
  setStatsTimeframe: (timeframe: StatsTimeframe) => void;
  statsTimeframe: StatsTimeframe;
}

export const getUsageData = ({
  arePrivateStatsLoading,
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
  setStatsTimeframe: setTimeframe,
  statsTimeframe: timeframe,
}: UsageDataParams): UsageData => {
  const publicUsageData: UsageData = {
    countries,
    error: publicStatsError,
    isWalletConnected,
    loading: arePublicStatsLoading,
    pristine,
    setTimeframe,
    timeframe,
    totalCached,
    totalRequests: publicTotalRequests,
    totalRequestsHistory: publicTotalRequestsHistory,
  };

  const {
    totalRequests: privateTotalRequests = 0,
    counts: privateTotalRequestsHistory = {},
  } = privateStats;

  const privateUsageData: UsageData = {
    countries: undefined,
    error: undefined,
    isWalletConnected,
    loading: arePrivateStatsLoading,
    pristine: false,
    setTimeframe,
    timeframe,
    totalCached: new BigNumber(0),
    totalRequests: new BigNumber(privateTotalRequests),
    totalRequestsHistory: privateTotalRequestsHistory,
  };

  return isWalletConnected ? privateUsageData : publicUsageData;
};
