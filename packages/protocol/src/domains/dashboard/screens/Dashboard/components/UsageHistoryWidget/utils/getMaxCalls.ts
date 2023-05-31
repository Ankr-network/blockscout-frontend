import { UsageHistoryData } from 'domains/dashboard/store/types';

export const getMaxCalls = (data: UsageHistoryData[]) =>
  Math.max(...data.map(({ calls }) => calls));
