import { t } from '@ankr.com/common';

import { ECurrency } from '../types';

export interface IRenderCryptoPriceParams {
  amount: number;
  currency: ECurrency;
  isSelected?: boolean;
}

export const renderCryptoPrice = ({
  amount,
  currency,
  isSelected,
}: IRenderCryptoPriceParams) => {
  if (isSelected) {
    return t('account.amounts.prices.crypto', { amount, currency });
  }

  return t('account.amounts.prices.crypto-amount', { amount });
};
