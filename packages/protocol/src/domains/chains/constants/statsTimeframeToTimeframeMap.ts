import { Timeframe } from 'multirpc-sdk';

import { StatsTimeframe } from 'domains/chains/types';

export const statsTimeframeToTimeframeMap: Record<StatsTimeframe, Timeframe> = {
  [StatsTimeframe.DAY]: '24h',
  [StatsTimeframe.WEEK]: '7d',
  [StatsTimeframe.MONTH]: '30d',
};
