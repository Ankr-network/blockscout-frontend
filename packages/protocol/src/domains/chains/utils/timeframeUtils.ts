import { getDate, getHours, getMonth, getTime, getYear } from 'date-fns';
import { Timeframe } from '../types';

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

  return timeframe === Timeframe.Week
    ? getTime(new Date(year, month, day))
    : getTime(new Date(year, month, day, hour));
};

export const getNextStatsTimestamp = (
  timeStamp: number,
  timeframe: Timeframe,
) => {
  const year = getYear(timeStamp);
  const month = getMonth(timeStamp);
  const day = getDate(timeStamp);
  const hour = getHours(timeStamp);

  return timeframe === Timeframe.Week
    ? getTime(new Date(year, month, day)) + ONE_DAY_LIFETIME
    : getTime(new Date(year, month, day, hour)) + ONE_HOUR_LIFETIME;
};
