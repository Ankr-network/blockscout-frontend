import { PrivateStatsInterval } from 'multirpc-sdk';

export const timeframeTextMap: Record<PrivateStatsInterval, string> = {
  [PrivateStatsInterval.HOUR]: 'hour',
  [PrivateStatsInterval.DAY]: 'day',
  [PrivateStatsInterval.WEEK]: 'week',
  [PrivateStatsInterval.MONTH]: 'month',
};
