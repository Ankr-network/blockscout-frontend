import { t } from '@ankr.com/common';

import { ECurrency } from '../types';

export interface IRenderCryptoPriceParams {
  amount: number;
  currency: ECurrency;
}

export const renderCryptoPrice = ({
  amount,
  currency,
}: IRenderCryptoPriceParams) =>
  t('account.amounts.prices.crypto', { amount, currency });
