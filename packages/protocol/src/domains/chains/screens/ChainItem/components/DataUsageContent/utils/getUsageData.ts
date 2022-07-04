import BigNumber from 'bignumber.js';
import { PrivateStat } from 'multirpc-sdk';

import { PublicStats, UsageData } from '../types';
import { StatsTimeframe } from 'domains/chains/types';
import { getMethodRequests } from './getMethodRequests';

export interface UsageDataParams {
  arePrivateStatsLoading: boolean;
  isWalletConnected: boolean;
  privateStats: PrivateStat;
  publicStats: PublicStats;
  setStatsTimeframe: (timeframe: StatsTimeframe) => void;
  statsTimeframe: StatsTimeframe;
  switchStatsTimeframe: () => void;
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
  switchStatsTimeframe,
}: UsageDataParams): UsageData => {
  const publicUsageData: UsageData = {
    countries,
    error: publicStatsError,
    isWalletConnected,
    loading: arePublicStatsLoading,
    methodRequests: [],
    pristine,
    setTimeframe,
    switchStatsTimeframe,
    timeframe,
    totalCached,
    totalRequests: publicTotalRequests,
    totalRequestsHistory: publicTotalRequestsHistory,
  };

  const {
    totalRequests: privateTotalRequests = 0,
    counts: privateTotalRequestsHistory = {},
    topRequests,
  } = privateStats;

  const privateUsageData: UsageData = {
    countries: undefined,
    error: undefined,
    isWalletConnected,
    loading: arePrivateStatsLoading,
    methodRequests: getMethodRequests(topRequests),
    pristine: false,
    setTimeframe,
    switchStatsTimeframe,
    timeframe,
    totalCached: new BigNumber(0),
    totalRequests: new BigNumber(privateTotalRequests),
    totalRequestsHistory: privateTotalRequestsHistory,
  };

  return isWalletConnected ? privateUsageData : publicUsageData;
};
