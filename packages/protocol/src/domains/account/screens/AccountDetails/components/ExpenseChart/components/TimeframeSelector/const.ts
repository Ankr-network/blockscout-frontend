import { t } from '@ankr.com/common';

import { ISelectOption } from 'uiKit/Select';

import { ChartTimeframe } from '../../types';
import { root } from '../../const';

const week = t(`${root}.timeframes.week`);
const month = t(`${root}.timeframes.month`);
const year = t(`${root}.timeframes.year`);

export const options: ISelectOption[] = [
  {
    label: week,
    value: ChartTimeframe.WEEK,
  },
  {
    label: month,
    value: ChartTimeframe.MONTH,
  },
  {
    label: year,
    value: ChartTimeframe.YEAR,
  },
];
