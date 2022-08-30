import { Timeframe } from '../types';
import { t } from 'modules/i18n/utils/intl';

const { Hour, Day, Week, Month } = Timeframe;

export const timeframeToLabelMap: Record<Timeframe, string> = {
  [Hour]: t('chains.timeframes.hour'),
  [Day]: t('chains.timeframes.day'),
  [Week]: t('chains.timeframes.week'),
  [Month]: t('chains.timeframes.month'),
};
