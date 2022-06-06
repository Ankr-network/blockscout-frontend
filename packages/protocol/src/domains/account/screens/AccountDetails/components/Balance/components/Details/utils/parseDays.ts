import { ParsedDays, Period, Quantifier } from './types';

interface Interval {
  condition: (days: number) => boolean;
  getQuantifier: (days: number) => Quantifier;
  getValue: (days: number) => number;
  period: Period;
}

const DAYS_IN_MONTH = 30;
const MONTHS_IN_YEAR = 12;
const DAYS_IN_YEAR = DAYS_IN_MONTH * MONTHS_IN_YEAR;

const intervals: Interval[] = [
  {
    condition: days => days < DAYS_IN_MONTH,
    getQuantifier: () => Quantifier.APPROXIMATELY,
    getValue: days => (days > -1 ? days : 0),
    period: Period.DAY,
  },
  {
    condition: days => days >= DAYS_IN_MONTH && days < DAYS_IN_YEAR,
    getQuantifier: () => Quantifier.APPROXIMATELY,
    getValue: days => Math.round(days / DAYS_IN_MONTH),
    period: Period.MONTH,
  },
  {
    condition: days => days >= DAYS_IN_YEAR,
    getQuantifier: () => Quantifier.MORE,
    // we shouldn't display more years than one
    getValue: () => 1,
    period: Period.YEAR,
  },
];

const getInterval = (days: number): Interval =>
  intervals.find(({ condition }) => condition(days)) || intervals[0];

export const parseDays = (days: number): ParsedDays => {
  const { period, getQuantifier, getValue } = getInterval(days);
  const value = getValue(days);
  const quantifier = getQuantifier(days);

  return [value, period, quantifier];
};
