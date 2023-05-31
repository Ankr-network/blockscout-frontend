import { AggregatedUsageHistory, UsageHistoryData } from '../types';

export const getUsageHistoryData = (history: AggregatedUsageHistory) =>
  Object.entries(history).map<UsageHistoryData>(([month, calls]) => ({
    month,
    calls,
  }));
