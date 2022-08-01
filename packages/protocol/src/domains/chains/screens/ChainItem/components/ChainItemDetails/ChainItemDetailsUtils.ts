import BigNumber from 'bignumber.js';
import { StatsTimeframe } from 'domains/chains/types';

export const getCachedRequestPercent = (
  totalRequests?: BigNumber,
  totalCached?: BigNumber,
) => {
  if (!totalRequests || !totalCached) return '';

  const percent = totalCached.multipliedBy(100).dividedBy(totalRequests);

  return !percent.isNaN() ? `${percent.toFormat(2)}%` : '-';
};

const SECONDS_IN_A_DAY = 86_400;

const getSeconds = (timeframe: StatsTimeframe): number => {
  switch (timeframe) {
    case StatsTimeframe.DAY:
      return SECONDS_IN_A_DAY;

    case StatsTimeframe.WEEK:
      return SECONDS_IN_A_DAY * 7;

    case StatsTimeframe.MONTH:
    default:
      return SECONDS_IN_A_DAY * 30;
  }
};

export const getAvarageRequests = (
  timeframe: StatsTimeframe,
  requests?: BigNumber,
) => {
  if (!requests) return 0;

  const seconds = getSeconds(timeframe);

  const reqsPerSecond = requests.div(seconds);

  return reqsPerSecond.isEqualTo(0)
    ? 0
    : requests.div(seconds).toFormat(5) || 0;
};

export const formatNumber = (number?: BigNumber): string => {
  if (!number) return '';

  let formattedNumber;
  try {
    formattedNumber = number.toFormat();
  } catch (e) {
    /* got case with number caching with data mutation */
    formattedNumber = new BigNumber(number).toFormat();
  }

  return formattedNumber;
};
