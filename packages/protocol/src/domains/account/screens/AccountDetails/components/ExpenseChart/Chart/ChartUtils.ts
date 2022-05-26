import { IChartData } from 'modules/common/components/Chart';
import { ExpenseChartTimeframe } from '../types';
import { i18nKeyRoot } from '../ExpenseChartUtils';
import { t } from 'modules/i18n/utils/intl';

const now = new Date();
const oneWeekStartDate = new Date(new Date().setDate(now.getDate() - 7));
const oneMonthStartDate = new Date(new Date().setMonth(now.getMonth() - 1));
const threeMonthStartDate = new Date(new Date().setMonth(now.getMonth() - 3));
const oneYearStartDate = new Date(
  new Date().setFullYear(now.getFullYear() - 1),
);
const allTimeStartDate = new Date(
  new Date().setFullYear(now.getFullYear() - 3),
);

const base = Array(100).fill(undefined);

const getRandomInt = (max = 25_000) => Math.floor(Math.random() * max);

const getRandomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const sorter = (a: IChartData, b: IChartData) =>
  a.time.getTime() - b.time.getTime();

export const mockedDataMap: Record<ExpenseChartTimeframe, IChartData[]> = {
  [ExpenseChartTimeframe.OneWeek]: base
    .map(() => ({
      time: getRandomDate(oneWeekStartDate, now),
      value: getRandomInt(),
    }))
    .sort(sorter),

  [ExpenseChartTimeframe.OneMonth]: base
    .map(() => ({
      time: getRandomDate(oneMonthStartDate, now),
      value: getRandomInt(),
    }))
    .sort(sorter),

  [ExpenseChartTimeframe.ThreeMonth]: base
    .map(() => ({
      time: getRandomDate(threeMonthStartDate, now),
      value: getRandomInt(),
    }))
    .sort(sorter),

  [ExpenseChartTimeframe.OneYear]: base
    .map(() => ({
      time: getRandomDate(oneYearStartDate, now),
      value: getRandomInt(),
    }))
    .sort(sorter),

  [ExpenseChartTimeframe.All]: base
    .map(() => ({
      time: getRandomDate(allTimeStartDate, now),
      value: getRandomInt(),
    }))
    .sort(sorter),
};

type FormatDateMap = Record<ExpenseChartTimeframe, (value: Date) => string>;

export const formatDateMap: FormatDateMap = {
  [ExpenseChartTimeframe.OneWeek]: value =>
    t(`${i18nKeyRoot}.chart.short-date`, { value }),
  [ExpenseChartTimeframe.OneMonth]: value =>
    t(`${i18nKeyRoot}.chart.short-date`, { value }),
  [ExpenseChartTimeframe.ThreeMonth]: value =>
    t(`${i18nKeyRoot}.chart.short-date`, { value }),
  [ExpenseChartTimeframe.OneYear]: value =>
    t(`${i18nKeyRoot}.chart.medium-date`, { value }),
  [ExpenseChartTimeframe.All]: value =>
    t(`${i18nKeyRoot}.chart.medium-date`, { value }),
};
