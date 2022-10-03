import { t } from 'modules/i18n/utils/intl';
import { ChartCurrency } from '../../types';

export const valuesMap: Record<ChartCurrency, string> = {
  [ChartCurrency.ANKR]: t('account.currencies.ankr'),
  [ChartCurrency.USD]: t('account.currencies.usd'),
  [ChartCurrency.CREDIT]: t('account.currencies.credit'),
};
