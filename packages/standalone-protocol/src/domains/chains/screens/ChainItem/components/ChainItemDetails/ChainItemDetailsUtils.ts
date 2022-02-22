import BigNumber from 'bignumber.js';
import { Timeframe } from 'multirpc-sdk';

export const getCachedRequestPercent = (
  totalRequests?: BigNumber,
  totalCached?: BigNumber,
) => {
  if (!totalRequests || !totalCached) return '';

  const percent = totalCached.multipliedBy(100).dividedBy(totalRequests);

  return !percent.isNaN() ? `${percent.toFormat(2)}%` : '-';
};

const SECONDS_IN_A_DAY = 86_400;

const getSeconds = (timeframe: Timeframe): number => {
  switch (timeframe) {
    case '30d':
      return SECONDS_IN_A_DAY * 30;

    case '7d':
      return SECONDS_IN_A_DAY * 7;

    case '24h':
    default:
      return SECONDS_IN_A_DAY;
  }
};

export const getAvarageRequests = (
  timeframe: Timeframe,
  requests?: BigNumber,
) => {
  if (!requests) return '';

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
