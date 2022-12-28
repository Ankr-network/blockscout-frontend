import BigNumber from 'bignumber.js';

import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { PrivateStat } from 'multirpc-sdk';
import { UsageData } from '../../types';
import { makePrivateCountryMap } from '../../utils/makePrivateCountryMap';

const SHOULD_SHOW_ONLY_PREMIUM_30D_COUNTRIES = true;

export interface UsageDataParams {
  isConnecting: boolean;
  arePrivateStatsLoading: boolean;
  privateStatsError: any;
  privateStats?: PrivateStat;
  day30PrivateStats?: PrivateStat;
  timeframe: Timeframe;
  userTopRequests: TopRequestsResultData;
  userTopRequestsIp: UserRequestsByIpData[];
}

export const getPrivateUsageData = ({
  arePrivateStatsLoading,
  day30PrivateStats,
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
