import { t } from '@ankr.com/common';

import { ECurrency } from '../types';

export interface IRenderCryptoAmountParams {
  amount: number;
  currency: ECurrency;
}

export const renderCryptoAmount = (params: IRenderCryptoAmountParams) =>
  t('account.amounts.crypto', params);
