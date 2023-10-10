import { UsageHistoryData } from '../../../types';

export const getMaxCalls = (data: UsageHistoryData[]) =>
  Math.max(...data.map(({ calls }) => Number(calls)));
