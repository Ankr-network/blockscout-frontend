import { t } from '@ankr.com/common';

import { intlRoot } from '../const';

const creditIntlKey = `${intlRoot}.credit-balance`;

export interface IRenderCreditBalanceParams {
  creditBalance: number;
}

export const renderCreditBalance = ({
  creditBalance: balance,
}: IRenderCreditBalanceParams) => t(creditIntlKey, { balance });
