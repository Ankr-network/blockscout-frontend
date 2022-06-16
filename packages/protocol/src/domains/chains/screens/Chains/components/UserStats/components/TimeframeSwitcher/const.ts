import { t } from 'modules/i18n/utils/intl';
import { Timeframe } from '../../types';

const { DAY, WEEK, MONTH } = Timeframe;

const timeframes = 'chains.user-stats.timeframes';

export const valuesMap: Record<Timeframe, string> = {
  [DAY]: t(`${timeframes}.day`),
  [WEEK]: t(`${timeframes}.week`),
  [MONTH]: t(`${timeframes}.month`),
};
