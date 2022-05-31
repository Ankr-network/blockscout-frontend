import { Period } from './types';
import { i18nKeyRoot } from '../../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

const root = `${i18nKeyRoot}.descriptions.periods`;

const periodsMap: Record<Period, (plural: string) => string> = {
  [Period.DAY]: plural => t(`${root}.day`, { plural }),
  [Period.MONTH]: plural => t(`${root}.month`, { plural }),
  [Period.YEAR]: plural => t(`${root}.year`, { plural }),
};

export const getPeriod = (time: number, period: Period) =>
  periodsMap[period](time > 1 ? t(`${root}.plural`) : '');
