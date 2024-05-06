import { t } from '@ankr.com/common';

import { ECurrency } from '../types';

export const renderStablecoinPrice = (token: ECurrency, amount: number) =>
  t('account.amounts.prices.stablecoin', { token, amount });
