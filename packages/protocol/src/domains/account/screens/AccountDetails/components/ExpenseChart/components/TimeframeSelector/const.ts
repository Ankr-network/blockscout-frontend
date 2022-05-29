import { ChartTimeframe } from '../../types';
import { ISelectOption } from 'uiKit/Select';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

const week = t(`${root}.timeframes.week`);
const month = t(`${root}.timeframes.month`);
const year = t(`${root}.timeframes.year`);
const all = t(`${root}.timeframes.all`);

export const options: ISelectOption[] = [
  {
    label: `1 ${week}`,
    value: ChartTimeframe.WEEK,
  },
  {
    label: `1 ${month}`,
    value: ChartTimeframe.MONTH,
  },
  {
    label: `3 ${month}`,
    value: ChartTimeframe.THREE_MONTHS,
  },
  {
    label: `1 ${year}`,
    value: ChartTimeframe.YEAR,
  },
  {
    label: all,
    value: ChartTimeframe.ALL,
  },
];
