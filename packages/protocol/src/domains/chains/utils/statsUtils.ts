import { PrivateStatsInterval, Timeframe } from 'multirpc-sdk';
import { StatsTimeframe } from '../types';

const POLYGON_STATS_RPC = 'https://polygon-rpc.com/api/data/stats';
const BSC_STATS_RPC = 'https://bscrpc.com/api/data/stats';
const FANTOM_STATS_RPC = 'https://rpc.ftm.tools/api/data/stats';

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
export const FIFTEEN_MINUTES_INTERVAL = 4;
export const SEVEN_DAYS_IN_WEEK = 7;

export const timeframeToIntervalMap: Record<
  StatsTimeframe,
  PrivateStatsInterval
> = {
  [StatsTimeframe.DAY]: PrivateStatsInterval.DAY,
  [StatsTimeframe.WEEK]: PrivateStatsInterval.WEEK,
  [StatsTimeframe.MONTH]: PrivateStatsInterval.MONTH,
};

export const getLegacyStandaloneUrl = (chainId: string) => {
  let url = '';

  if (chainId === 'polygon') {
    url = POLYGON_STATS_RPC;
  } else if (chainId === 'bsc') {
    url = BSC_STATS_RPC;
  } else if (chainId === 'fantom') {
    url = FANTOM_STATS_RPC;
  }

  return url;
};

export const getMultiplier = (timeframe: Timeframe) => {
  let multiplier = 1;

  if (timeframe === '7d') {
    multiplier = 7;
  } else if (timeframe === '30d') {
    multiplier = 30;
  }

  return multiplier;
};

export const formatLegacyRequestsHistoryTo15MinutesInterval = (
  legacyRequests: Record<string, number>,
) => {
  const data: Record<string, number> = {};

  Object.keys(legacyRequests).forEach((key: string) => {
    const value = legacyRequests[key] / FIFTEEN_MINUTES_INTERVAL;

    for (let i = 0; i < 4; i++) {
      const timestamp = Number(key) - FIFTEEN_MINUTES_IN_MS * i;
      data[timestamp] = Math.ceil(value);
    }
  });

  return data;
};

export const calculateOnedayRequests = (
  totalRequests: Record<string, number>,
) => {
  let onedayRequests = 0;

  Object.keys(totalRequests).forEach((key: string) => {
    onedayRequests += totalRequests[key];
  });

  return onedayRequests;
};
