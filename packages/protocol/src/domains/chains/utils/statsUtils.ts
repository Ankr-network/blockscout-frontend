import { ChainID } from 'modules/chains/types';
import { Timeframe } from 'multirpc-sdk';
import { timeframeToLabelMap } from '../screens/ChainItem/components/UsageDataSection/const';
import { Timeframe as TimeframeInterval } from '../types';

const POLYGON_STATS_RPC = 'https://polygon-rpc.com/api/data/stats';
const BSC_STATS_RPC = 'https://bscrpc.com/api/data/stats';
const FANTOM_STATS_RPC = 'https://rpc.ftm.tools/api/data/stats';

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
export const FIFTEEN_MINUTES_INTERVAL = 4;
export const SEVEN_DAYS_IN_WEEK = 7;
export const HOURS_IN_ONE_DAY = 24;
const DAYS_IN_ONE_MONTH = 30;

const { Hour, Week, Month } = TimeframeInterval;

export const getLegacyStandaloneUrl = (chainId: string) => {
  let url = '';

  if (chainId === ChainID.POLYGON) {
    url = POLYGON_STATS_RPC;
  } else if (chainId === ChainID.BSC) {
    url = BSC_STATS_RPC;
  } else if (chainId === ChainID.FANTOM) {
    url = FANTOM_STATS_RPC;
  }

  return url;
};

export const getMultiplier = (timeframe: Timeframe) => {
  let multiplier = 1;

  if (timeframe === timeframeToLabelMap[Hour]) {
    multiplier = 1 / HOURS_IN_ONE_DAY;
  } else if (timeframe === timeframeToLabelMap[Week]) {
    multiplier = SEVEN_DAYS_IN_WEEK;
  } else if (timeframe === timeframeToLabelMap[Month]) {
    multiplier = DAYS_IN_ONE_MONTH;
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
