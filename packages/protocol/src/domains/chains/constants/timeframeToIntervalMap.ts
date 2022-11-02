import { PrivateStatsInterval, PublicStatsInterval } from 'multirpc-sdk';

import { Timeframe } from '../types';

const { Hour, Day, Week, Month } = Timeframe;

export const timeframeToIntervalMap: Record<Timeframe, PrivateStatsInterval> = {
  [Hour]: PrivateStatsInterval.HOUR,
  [Day]: PrivateStatsInterval.DAY,
  [Week]: PrivateStatsInterval.WEEK,
  [Month]: PrivateStatsInterval.MONTH,
};

export const toTimeframeMap: Record<Timeframe, PublicStatsInterval> = {
  [Hour]: PublicStatsInterval.HOUR,
  [Day]: PublicStatsInterval.DAY,
  [Week]: PublicStatsInterval.WEEK,
  [Month]: PublicStatsInterval.MONTH,
};
