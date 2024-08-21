import BigNumber from 'bignumber.js';

import { Timeframe } from 'modules/chains/types';

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
) => {
  if (requests.isEqualTo(0)) {
    return '0';
  }

  const requestsPerSecond = requests.div(timeframeToSecondsMap[timeframe]);

  let decimalPlaces = 1;

  if (requestsPerSecond.isLessThan(1)) {
    decimalPlaces = 5;
  }

  return requestsPerSecond.toFormat(decimalPlaces);
};
