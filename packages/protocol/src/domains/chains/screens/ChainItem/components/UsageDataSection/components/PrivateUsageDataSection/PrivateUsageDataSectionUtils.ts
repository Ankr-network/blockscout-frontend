import BigNumber from 'bignumber.js';
import { PrivateStat, PrivateStatTopRequests } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { mapUsageDataForChartWidget } from 'modules/chains/utils/mapUsageDataForChartWidget';

import { UsageData } from '../../types';
import { makePrivateCountryMap } from '../../utils/makePrivateCountryMap';

export interface UsageDataParams {
  isConnecting: boolean;
  arePrivateStatsLoading: boolean;
  privateStatsError: any;
  privateStats?: PrivateStat;
  timeframe: Timeframe;
  userTopRequests: PrivateStatTopRequests[];
}

export const getPrivateUsageData = ({
  arePrivateStatsLoading,
  isConnecting,
  privateStats,
  privateStatsError,
  timeframe,
  userTopRequests,
}: UsageDataParams): UsageData => {
  const {
    countries_count: { top_countries: privateCountries = [] } = {},
    counts: privateTotalRequestsHistory = {},
    total: { total_cost: totalCost = 0 } = {},
    total_requests: privateTotalRequests = 0,
  } = privateStats || {};

  const privateUsageData: UsageData = {
    countries: makePrivateCountryMap(privateCountries),
    error: privateStatsError,
    isConnecting,
    loading: arePrivateStatsLoading || isConnecting,
    timeframe,
    totalCost,
    totalRequests: new BigNumber(privateTotalRequests),
    totalRequestsHistory: mapUsageDataForChartWidget(
      privateTotalRequestsHistory,
    ),
    userTopRequests,
  };

  return privateUsageData;
};
