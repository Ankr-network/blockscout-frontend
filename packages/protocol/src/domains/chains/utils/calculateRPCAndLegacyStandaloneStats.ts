import BigNumber from 'bignumber.js';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';

import { ILegacyStandaloneStats } from '../actions/fetchLegacyStandaloneRequests';
import {
  calculateOnedayRequests,
  getMultiplier,
  SEVEN_DAYS_IN_WEEK,
  FIFTEEN_MINUTES_INTERVAL,
} from './statsUtils';

const calculateTotalValues = (
  timeframe: Timeframe,
  rpcStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
): IWorkerGlobalStatus => {
  const multiplier = getMultiplier(timeframe);

  const totalRequests = new BigNumber(legacyStats?.requests ?? 0)
    .multipliedBy(multiplier)
    .plus(rpcStats.totalRequests)
    .toNumber();

  const totalCached = new BigNumber(legacyStats?.cachedRequests ?? 0)
    .multipliedBy(multiplier)
    .plus(rpcStats.totalCached)
    .toNumber();

  return { ...rpcStats, totalRequests, totalCached };
};

const calculate24HRequests = (
  totalStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
) => {
  const legacyRequestsHistory = legacyStats?.totalRequestsHistory ?? {};

  const totalTimestamps = Object.keys(legacyRequestsHistory).length;
  const oneTimestampRequests = new BigNumber(
    calculateOnedayRequests(legacyRequestsHistory),
  )
    .dividedToIntegerBy(FIFTEEN_MINUTES_INTERVAL)
    .dividedToIntegerBy(totalTimestamps)
    .toNumber();

  Object.keys(totalStats.totalRequestsHistory).forEach((key: string) => {
    totalStats.totalRequestsHistory[key] += oneTimestampRequests;
  });

  return totalStats;
};

const calculate7DRequests = (
  totalStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
) => {
  const totalRequestsHistory = legacyStats?.totalRequestsHistory ?? {};

  const amount = Object.keys(totalStats.totalRequestsHistory).length;
  const oneTimestampRequests = new BigNumber(SEVEN_DAYS_IN_WEEK)
    .multipliedBy(calculateOnedayRequests(totalRequestsHistory))
    .dividedToIntegerBy(amount)
    .toNumber();

  Object.keys(totalStats.totalRequestsHistory).forEach((key: string) => {
    totalStats.totalRequestsHistory[key] += oneTimestampRequests;
  });

  return totalStats;
};

const calculate30DRequests = (
  totalStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
) => {
  const totalRequestsHistory = legacyStats?.totalRequestsHistory ?? {};

  const onedayRequests = calculateOnedayRequests(totalRequestsHistory);

  Object.keys(totalStats.totalRequestsHistory).forEach((key: string) => {
    totalStats.totalRequestsHistory[key] += onedayRequests;
  });

  return totalStats;
};

export const calculateRPCAndLegacyStandaloneStats = (
  timeframe: Timeframe,
  rpcStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
) => {
  const calculatedTotalStats = calculateTotalValues(
    timeframe,
    rpcStats,
    legacyStats,
  );

  switch (timeframe) {
    case '24h': {
      return calculate24HRequests(calculatedTotalStats, legacyStats);
    }

    case '7d': {
      return calculate7DRequests(calculatedTotalStats, legacyStats);
    }

    case '30d':
    default: {
      return calculate30DRequests(calculatedTotalStats, legacyStats);
    }
  }
};
