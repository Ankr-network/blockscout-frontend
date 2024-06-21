import { t } from '@ankr.com/common';

export interface IRenderUSDAmountParams {
  amount: number;
  isApproximate?: boolean;
}

export const renderUSDAmount = ({
  amount,
  isApproximate,
}: IRenderUSDAmountParams) =>
  t('account.amounts.usd', { amount, isApproximate });
