import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getTime,
  getYear,
} from 'date-fns';
import { Timeframe } from '@ankr.com/chains-list';

export const ONE_MINUTE_LIFETIME = 60 * 1000;
export const ONE_HOUR_LIFETIME = 60 * ONE_MINUTE_LIFETIME;
export const ONE_DAY_LIFETIME = 24 * ONE_HOUR_LIFETIME;

const ONE_WEEK_HOURS = 7 * 24;

export const LIFETIME = ONE_HOUR_LIFETIME * ONE_WEEK_HOURS;

export const getCurrentTimestamp = (
  timeStamp: number,
  timeframe: Timeframe,
) => {
  const year = getYear(timeStamp);
  const month = getMonth(timeStamp);
  const day = getDate(timeStamp);
  const hour = getHours(timeStamp);
  const minute = getMinutes(timeStamp);

  switch (timeframe) {
    case Timeframe.Hour:
      return getTime(new Date(year, month, day, hour, minute));

    case Timeframe.Day:
      return getTime(new Date(year, month, day, hour));

    case Timeframe.Week:
    case Timeframe.Month:
    default:
      return getTime(new Date(year, month, day));
  }
};
