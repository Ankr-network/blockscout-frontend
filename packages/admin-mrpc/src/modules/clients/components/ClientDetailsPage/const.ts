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
  [PrivateStatsInterval.TWO_HOURS]: '2 hours',
  [PrivateStatsInterval.TWO_DAYS]: '2 days',
};

export const NOT_FOUND_TEXT = 'Not found';
