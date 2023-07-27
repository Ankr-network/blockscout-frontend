import { t } from '@ankr.com/common';

import { ChartCurrency, ChartTimeframe } from './types';

export const root = 'account.account-details.expense-chart';

const { ALL, MONTH, THREE_MONTHS, WEEK, YEAR } = ChartTimeframe;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FormatDateMap = Record<ChartTimeframe, (value: Date) => string>;

export const formatDateMap: FormatDateMap = {
  [ALL]: value => t(`${root}.chart.medium-date`, { value }),
  [MONTH]: value => t(`${root}.chart.short-date`, { value }),
  [THREE_MONTHS]: value => t(`${root}.chart.short-date`, { value }),
  [WEEK]: value => t(`${root}.chart.short-date`, { value }),
  [YEAR]: value => t(`${root}.chart.medium-date`, { value }),
};

export const currenciesMap: Record<ChartCurrency, () => string> = {
  [ChartCurrency.ANKR]: () => t('account.currencies.ankr'),
  [ChartCurrency.USD]: () => t('account.currencies.usd'),
  [ChartCurrency.CREDIT]: () => t('account.currencies.credit'),
};

// TODO remove currency switcher
export const SWITCH_CURRENCY_DISABLED = true;
