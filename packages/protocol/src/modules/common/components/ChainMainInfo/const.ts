import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

const { DAY, WEEK, MONTH } = StatsTimeframe;

export const timeframeLabelsMap: Record<StatsTimeframe, string> = {
  [DAY]: t('chains.stats-timeframes.day'),
  [WEEK]: t('chains.stats-timeframes.week'),
  [MONTH]: t('chains.stats-timeframes.month'),
};
