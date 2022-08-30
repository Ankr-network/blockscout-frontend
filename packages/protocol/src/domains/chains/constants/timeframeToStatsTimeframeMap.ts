import { Timeframe as StatsTimeframe } from 'multirpc-sdk';

import { Timeframe } from 'domains/chains/types';

export const timeframeToStatsTimeframe: Record<Timeframe, StatsTimeframe> = {
  [Timeframe.Hour]: '1h',
  [Timeframe.Day]: '24h',
  [Timeframe.Week]: '7d',
  [Timeframe.Month]: '30d',
};
