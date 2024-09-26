import { t } from '@ankr.com/common';

export interface IRenderUsdBalanceProps {
  hasZeroDecimals?: boolean;
  isApproximate?: boolean;
  usdBalance: number;
}

export const renderUsdBalance = ({
  hasZeroDecimals = true,
  isApproximate,
  usdBalance: balance,
}: IRenderUsdBalanceProps) => {
  if (!hasZeroDecimals && balance === 0) {
    return '$0';
  }

  return t('balance.usd', { balance, isApproximate });
};
