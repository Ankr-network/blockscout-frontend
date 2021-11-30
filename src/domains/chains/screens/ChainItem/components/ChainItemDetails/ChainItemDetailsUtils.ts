import BigNumber from 'bignumber.js';
import { Timeframe } from '@ankr.com/multirpc';

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

export const getSubtitle = (
  timeframe: Timeframe,
  isMobile: boolean,
): string => {
  if (isMobile) return timeframe;

  switch (timeframe) {
    case '30d':
      return 'chain-item.timeframe.30-days';

    case '7d':
      return 'chain-item.timeframe.7-days';

    case '24h':
    default:
      return 'chain-item.timeframe.24-hours';
  }
};

export const getAvarageRequests = (
  timeframe: Timeframe,
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
