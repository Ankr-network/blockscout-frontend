import { t } from '@ankr.com/common';

import { ISelectOption } from 'uiKit/Select';

import { ChartTimeframe } from '../../types';
import { root } from '../../const';

export const getOptions = (): ISelectOption[] => [
  {
    label: t(`${root}.timeframes.week`),
    value: ChartTimeframe.WEEK,
  },
  {
    label: t(`${root}.timeframes.month`),
    value: ChartTimeframe.MONTH,
  },
  {
    label: t(`${root}.timeframes.year`),
    value: ChartTimeframe.YEAR,
  },
];
