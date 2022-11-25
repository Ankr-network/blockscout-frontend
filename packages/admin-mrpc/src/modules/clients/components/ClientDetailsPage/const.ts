import { PrivateStatsInterval } from 'multirpc-sdk';
import { CustomRange } from './useClientDetailsPage';

export const timeframeTextMap: Record<
  PrivateStatsInterval | CustomRange,
  string
> = {
  [PrivateStatsInterval.HOUR]: 'last hour',
  [PrivateStatsInterval.DAY]: 'last 24 hours',
  [PrivateStatsInterval.WEEK]: 'last 7 days',
  [PrivateStatsInterval.MONTH]: 'last 30 days',
  [CustomRange.current]: 'current month',
  [CustomRange.previous]: 'previous month',
};
