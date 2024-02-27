import { t } from '@ankr.com/common';

export const renderUSDAmount = (amount: number) =>
  t('account.amounts.usd', { amount });
