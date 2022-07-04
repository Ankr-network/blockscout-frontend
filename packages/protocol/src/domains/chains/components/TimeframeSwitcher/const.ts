import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const timeframes = 'chains.stats-timeframes';

export const valuesMap: Record<StatsTimeframe, string> = {
  [DAY]: t(`${timeframes}.day`),
  [WEEK]: t(`${timeframes}.week`),
  [MONTH]: t(`${timeframes}.month`),
};
