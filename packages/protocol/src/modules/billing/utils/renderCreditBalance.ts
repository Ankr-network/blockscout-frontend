import { t } from '@ankr.com/common';

export interface IRenderCreditBalanceParams {
  creditBalance: number;
}

export const renderCreditBalance = ({
  creditBalance: balance,
}: IRenderCreditBalanceParams) => t('balance.credits', { balance });
