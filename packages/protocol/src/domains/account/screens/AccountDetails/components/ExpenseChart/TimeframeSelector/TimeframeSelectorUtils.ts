import { ExpenseChartTimeframe } from '../types';
import { ISelectOption } from 'uiKit/Select';
import { i18nKeyRoot } from '../ExpenseChartUtils';
import { t } from 'modules/i18n/utils/intl';

const week = t(`${i18nKeyRoot}.timeframes.week`);
const month = t(`${i18nKeyRoot}.timeframes.month`);
const year = t(`${i18nKeyRoot}.timeframes.year`);
const all = t(`${i18nKeyRoot}.timeframes.all`);

export const options: ISelectOption[] = [
  {
    label: `1 ${week}`,
    value: ExpenseChartTimeframe.OneWeek,
  },
  {
    label: `1 ${month}`,
    value: ExpenseChartTimeframe.OneMonth,
  },
  {
    label: `3 ${month}`,
    value: ExpenseChartTimeframe.ThreeMonth,
  },
  {
    label: `1 ${year}`,
    value: ExpenseChartTimeframe.OneYear,
  },
  {
    label: all,
    value: ExpenseChartTimeframe.All,
  },
];
