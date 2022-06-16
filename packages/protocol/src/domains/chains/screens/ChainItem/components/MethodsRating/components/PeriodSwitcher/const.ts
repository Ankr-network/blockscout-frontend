import { Period } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

export const labelsMap: Record<Period, string> = {
  [Period.Day]: t('chain-item.methods-rating.periods.day'),
  [Period.Week]: t('chain-item.methods-rating.periods.week'),
  [Period.Month]: t('chain-item.methods-rating.periods.month'),
};
