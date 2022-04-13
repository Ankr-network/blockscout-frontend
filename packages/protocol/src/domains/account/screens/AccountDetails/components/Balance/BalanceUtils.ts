import BigNumber from 'bignumber.js';

import { EnoughTime, EnoughTimePeriod } from './types';
import { t } from 'modules/i18n/utils/intl';

export const i18nKeyRoot = 'account.account-details.balance';

const periodsMap: Record<EnoughTimePeriod, string> = {
  [EnoughTimePeriod.Day]: t(`${i18nKeyRoot}.description.periods.day`),
  [EnoughTimePeriod.Month]: t(`${i18nKeyRoot}.description.periods.month`),
  [EnoughTimePeriod.Year]: t(`${i18nKeyRoot}.description.periods.year`),
};

export const getDescription = (enoughTime: EnoughTime) => {
  return t(`${i18nKeyRoot}.description.text`, {
    quantifier: t(`${i18nKeyRoot}.description.quantifiers.approximately`),
    value: enoughTime.value,
    period: periodsMap[enoughTime.period],
    plural:
      enoughTime.value > 1
        ? t(`${i18nKeyRoot}.description.periods.plural`)
        : '',
  });
};

export const formatNumber = (number = 0) => {
  return new BigNumber(number).toFormat();
};
