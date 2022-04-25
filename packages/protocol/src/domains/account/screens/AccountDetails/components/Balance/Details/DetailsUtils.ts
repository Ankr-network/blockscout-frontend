import { EnoughTime, EnoughTimePeriod, ServiceType } from '../types';
import { i18nKeyRoot } from '../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

export interface DescriptionGetterParams {
  enoughTime?: EnoughTime;
}

export type DescriptionGetter = (params: DescriptionGetterParams) => string;

const periodsMap: Record<EnoughTimePeriod, string> = {
  [EnoughTimePeriod.Day]: t(`${i18nKeyRoot}.description.served.periods.day`),
  [EnoughTimePeriod.Month]: t(
    `${i18nKeyRoot}.description.served.periods.month`,
  ),
  [EnoughTimePeriod.Year]: t(`${i18nKeyRoot}.description.served.periods.year`),
};

const getPremiumDescription: DescriptionGetter = () =>
  t(`${i18nKeyRoot}.description.premium.additional`);

const getServedDescription: DescriptionGetter = ({ enoughTime }) => {
  if (!enoughTime) {
    return '';
  }

  return t(`${i18nKeyRoot}.description.served.text`, {
    quantifier: t(
      `${i18nKeyRoot}.description.served.quantifiers.approximately`,
    ),
    value: enoughTime.value,
    period: periodsMap[enoughTime.period],
    plural:
      enoughTime.value > 1
        ? t(`${i18nKeyRoot}.description.served.periods.plural`)
        : '',
  });
};

export const getUnservedDescription: DescriptionGetter = () =>
  t(`${i18nKeyRoot}.description.unserved.text`);

export const serviceTypeToDescriptionMap: Record<
  ServiceType,
  DescriptionGetter
> = {
  [ServiceType.Premium]: getPremiumDescription,
  [ServiceType.Served]: getServedDescription,
  [ServiceType.Unserved]: getUnservedDescription,
};
