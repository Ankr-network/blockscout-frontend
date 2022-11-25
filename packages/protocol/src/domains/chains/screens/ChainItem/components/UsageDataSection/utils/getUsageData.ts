import BigNumber from 'bignumber.js';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { PrivateStat } from 'multirpc-sdk';
import { PublicStats, UsageData } from '../types';
import { makePrivateCountryMap } from './makePrivateCountryMap';

const SHOULD_SHOW_ONLY_PREMIUM_30D_COUNTRIES = true;

export interface UsageDataParams {
  isConnecting: boolean;
  arePrivateStatsLoading: boolean;
  privateStatsError: any;
  privateStats?: PrivateStat;
  day30PrivateStats?: PrivateStat;
  publicStats: PublicStats;
  timeframe: Timeframe;
  userTopRequests: TopRequestsResultData;
  userTopRequestsIp: UserRequestsByIpData[];
  hasCredentials: boolean;
}

export const getUsageData = ({
  isConnecting,
  arePrivateStatsLoading,
  privateStatsError,
  privateStats,
  day30PrivateStats,
  publicStats: {
    countries: publicCountries,
    error: publicStatsError,
    loading: arePublicStatsLoading,
    totalCached,
    totalRequests: publicTotalRequests,
    totalRequestsHistory: publicTotalRequestsHistory,
  },
  timeframe,
  userTopRequests,
  userTopRequestsIp,
  hasCredentials,
}: UsageDataParams): UsageData => {
  const publicUsageData: UsageData = {
    countries: publicCountries,
    error: publicStatsError,
    isConnecting,
    isWalletConnected: hasCredentials,
    loading: arePublicStatsLoading || isConnecting,
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
    total: { total_cost: totalCost = 0 } = {},
    countries_count: { top_countries: privateCountries = [] } = {},
  } = privateStats || {};

  const {
    countries_count: { top_countries: day30PrivateCountries = [] } = {},
  } = day30PrivateStats || {};

  const privateUsageData: UsageData = {
    countries: makePrivateCountryMap(
      SHOULD_SHOW_ONLY_PREMIUM_30D_COUNTRIES
        ? day30PrivateCountries
        : privateCountries,
    ),
    error: privateStatsError,
    isConnecting,
    isWalletConnected: hasCredentials,
    loading: arePrivateStatsLoading || isConnecting,
    timeframe,
    totalCached: new BigNumber(0),
    totalCost,
    totalRequests: new BigNumber(privateTotalRequests),
    totalRequestsHistory: Object.fromEntries(
      Object.entries(privateTotalRequestsHistory).map(
        ([timestamp, { count }]) => [timestamp, count],
      ),
    ),
    userTopRequests,
    userTopRequestsIp,
  };

  return hasCredentials ? privateUsageData : publicUsageData;
};
