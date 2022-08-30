import BigNumber from 'bignumber.js';

import { Timeframe } from 'domains/chains/types';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

const timeframeToSecondsMap: Record<Timeframe, number> = {
  [Timeframe.Hour]: HOUR,
  [Timeframe.Day]: DAY,
  [Timeframe.Week]: WEEK,
  [Timeframe.Month]: MONTH,
};

export const getRequestsAverage = (
  requests: BigNumber = new BigNumber(0),
  timeframe: Timeframe,
) =>
  requests.isEqualTo(0)
    ? '0'
    : requests.div(timeframeToSecondsMap[timeframe]).toFormat(5);
