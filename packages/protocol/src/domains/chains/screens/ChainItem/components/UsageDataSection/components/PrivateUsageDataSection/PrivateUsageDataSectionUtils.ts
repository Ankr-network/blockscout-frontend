import BigNumber from 'bignumber.js';

import { PrivateStat, PrivateStatTopRequests } from 'multirpc-sdk';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';
import { UsageData } from '../../types';
import { makePrivateCountryMap } from '../../utils/makePrivateCountryMap';

export const SHOULD_SHOW_ONLY_PREMIUM_7D_COUNTRIES = true;

export interface UsageDataParams {
  isConnecting: boolean;
  arePrivateStatsLoading: boolean;
  privateStatsError: any;
  privateStats?: PrivateStat;
  weekPrivateStats?: PrivateStat;
  timeframe: Timeframe;
  userTopRequests: PrivateStatTopRequests[];
  userTopRequestsIp: UserRequestsByIpData[];
}

export const getPrivateUsageData = ({
  arePrivateStatsLoading,
  weekPrivateStats,
  isConnecting,
  privateStats,
  privateStatsError,
  timeframe,
  userTopRequests,
  userTopRequestsIp,
}: UsageDataParams): UsageData => {
  const {
    total_requests: privateTotalRequests = 0,
    counts: privateTotalRequestsHistory = {},
    total: { total_cost: totalCost = 0 } = {},
    countries_count: { top_countries: privateCountries = [] } = {},
  } = privateStats || {};

  const { countries_count: { top_countries: weekPrivateCountries = [] } = {} } =
    weekPrivateStats || {};

  const privateUsageData: UsageData = {
    countries: makePrivateCountryMap(
      SHOULD_SHOW_ONLY_PREMIUM_7D_COUNTRIES
        ? weekPrivateCountries
        : privateCountries,
    ),
    error: privateStatsError,
    isConnecting,
    loading: arePrivateStatsLoading || isConnecting,
    timeframe,
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

  return privateUsageData;
};
