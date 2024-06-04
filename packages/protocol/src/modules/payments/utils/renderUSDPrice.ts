import { t } from '@ankr.com/common';

export const renderUSDPrice = (amount: number) =>
  t('account.amounts.prices.usd', { amount });
