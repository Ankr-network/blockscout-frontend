import BigNumber from 'bignumber.js';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';

import { ILegacyStandaloneStats } from '../actions/fetchLegacyStandaloneRequests';
import { timeframeToLabelMap } from '../screens/ChainItem/components/UsageDataSection/const';
import { Timeframe as TimeframeInterval } from '../types';
import {
  calculateOnedayRequests,
  getMultiplier,
  SEVEN_DAYS_IN_WEEK,
  FIFTEEN_MINUTES_INTERVAL,
  HOURS_IN_ONE_DAY,
} from './statsUtils';

const { Hour, Day, Week, Month } = TimeframeInterval;

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

  return {
    ...rpcStats,
    totalRequests: Math.ceil(totalRequests),
    totalCached: Math.ceil(totalCached),
  };
};

const calculate1HReqeusts = (
  totalStats: IWorkerGlobalStatus,
  legacyStats?: ILegacyStandaloneStats,
) => {
  const legacyTotalRequestsHistory = legacyStats?.totalRequestsHistory ?? {};
  const totalTimestamps = Object.keys(totalStats.totalRequestsHistory).length;

  const oneHourRequests = new BigNumber(
    calculateOnedayRequests(legacyTotalRequestsHistory),
  )
    .dividedToIntegerBy(HOURS_IN_ONE_DAY)
    .dividedToIntegerBy(totalTimestamps)
    .toNumber();

  Object.keys(totalStats.totalRequestsHistory).forEach((key: string) => {
    totalStats.totalRequestsHistory[key] += oneHourRequests;
  });

  return totalStats;
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
    case timeframeToLabelMap[Hour]: {
      return calculate1HReqeusts(calculatedTotalStats, legacyStats);
    }
    case timeframeToLabelMap[Day]: {
      return calculate24HRequests(calculatedTotalStats, legacyStats);
    }

    case timeframeToLabelMap[Week]: {
      return calculate7DRequests(calculatedTotalStats, legacyStats);
    }

    case timeframeToLabelMap[Month]:
    default: {
      return calculate30DRequests(calculatedTotalStats, legacyStats);
    }
  }
};
