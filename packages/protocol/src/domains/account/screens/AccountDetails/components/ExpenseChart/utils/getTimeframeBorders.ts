import { ChartTimeframe, ChartTimeframeBorders } from '../types';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const THREE_MONTHS = 3 * MONTH;
const YEAR = 4 * THREE_MONTHS;

const getNow = () => new Date().getTime();
const getWeekAgo = () => getNow() - WEEK;
const getMonthAgo = () => getNow() - MONTH;
const getThreeMonthsAgo = () => getNow() - THREE_MONTHS;
const getYearAgo = () => getNow() - YEAR;

const bordersMap: Record<ChartTimeframe, () => ChartTimeframeBorders> = {
  [ChartTimeframe.ALL]: () => ({}),
  [ChartTimeframe.MONTH]: () => ({ from: getMonthAgo() }),
  [ChartTimeframe.THREE_MONTHS]: () => ({ from: getThreeMonthsAgo() }),
  [ChartTimeframe.WEEK]: () => ({ from: getWeekAgo() }),
  [ChartTimeframe.YEAR]: () => ({ from: getYearAgo() }),
};

export const getTimeframeBorders = (timeframe: ChartTimeframe) =>
  bordersMap[timeframe]();
