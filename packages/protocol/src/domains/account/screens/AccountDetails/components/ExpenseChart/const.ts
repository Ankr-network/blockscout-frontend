import { t } from 'modules/i18n/utils/intl';
import { ChartCurrency, ChartTimeframe } from './types';

export const root = 'account.account-details.expense-chart';

const { ALL, MONTH, THREE_MONTHS, WEEK, YEAR } = ChartTimeframe;

export const formatDateMap: Record<ChartTimeframe, (value: Date) => string> = {
  [ALL]: value => t(`${root}.chart.medium-date`, { value }),
  [MONTH]: value => t(`${root}.chart.short-date`, { value }),
  [THREE_MONTHS]: value => t(`${root}.chart.short-date`, { value }),
  [WEEK]: value => t(`${root}.chart.short-date`, { value }),
  [YEAR]: value => t(`${root}.chart.medium-date`, { value }),
};

export const currenciesMap: Record<ChartCurrency, string> = {
  [ChartCurrency.ANKR]: t('account.currencies.ankr'),
  [ChartCurrency.USD]: t('account.currencies.usd'),
  [ChartCurrency.CREDIT]: t('account.currencies.credit'),
};

export const SWITCH_CURRENCY_DISABLED = true;
