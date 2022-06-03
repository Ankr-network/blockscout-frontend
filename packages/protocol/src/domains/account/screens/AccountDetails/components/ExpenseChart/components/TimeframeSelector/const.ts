import { ChartTimeframe } from '../../types';
import { ISelectOption } from 'uiKit/Select';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

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
