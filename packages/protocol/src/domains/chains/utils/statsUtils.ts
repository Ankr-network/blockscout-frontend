import { Timeframe } from 'multirpc-sdk';

const POLYGON_STATS_RPC = 'https://polygon-rpc.com/api/data/stats';
const BSC_STATS_RPC = 'https://bscrpc.com/api/data/stats';
const FANTOM_STATS_RPC = 'https://rpc.ftm.tools/api/data/stats';

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
const FIFTEEN_MINUTES_INTERVAL = 4;
export const SEVEN_DAYS_IN_WEEK = 7;

export const getUrlByChainId = (chainId: string) => {
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

export const mappingTotalRequestsHistory = (
  totalRequests: Record<string, number>,
) => {
  const mappingHistory: Record<string, number> = {};
  Object.keys(totalRequests).forEach((key: string) => {
    const value = totalRequests[key] / FIFTEEN_MINUTES_INTERVAL;
    for (let i = 0; i < 4; i++) {
      const timestamp = Number(key) - FIFTEEN_MINUTES_IN_MS * i;
      mappingHistory[timestamp] = Math.ceil(value);
    }
  });
  return mappingHistory;
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

export const calculateTimestampAmount = (
  totalRequests: Record<string, number>,
) => {
  let amount = 0;
  Object.keys(totalRequests).forEach(() => {
    amount += 1;
  });
  return amount;
};
