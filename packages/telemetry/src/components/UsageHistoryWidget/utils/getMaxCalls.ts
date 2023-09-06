import { UsageHistoryDataType } from '../../../types';

export const getMaxCalls = (data: UsageHistoryDataType[]) =>
  Math.max(...data.map(({ calls }) => Number(calls)));
