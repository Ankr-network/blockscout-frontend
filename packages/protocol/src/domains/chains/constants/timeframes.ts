import { Timeframe } from 'modules/chains/types';

export const USAGE_SHORT_TIMEFRAME_LIST = [Timeframe.Hour, Timeframe.Day];

export const USAGE_FULL_TIMEFRAME_LIST = [
  ...USAGE_SHORT_TIMEFRAME_LIST,
  Timeframe.Week,
  Timeframe.Month,
];
