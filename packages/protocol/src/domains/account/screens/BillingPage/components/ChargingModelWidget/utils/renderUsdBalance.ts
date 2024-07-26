import { t } from '@ankr.com/common';

import { intlRoot } from '../const';

export interface IRenderUsdBalanceProps {
  hasZeroDecimals?: boolean;
  isApproximate?: boolean;
  usdBalance: number;
}

const usdIntlKey = `${intlRoot}.usd-balance`;

export const renderUsdBalance = ({
  hasZeroDecimals = true,
  isApproximate,
  usdBalance: balance,
}: IRenderUsdBalanceProps) => {
  if (!hasZeroDecimals && balance === 0) {
    return '$0';
  }

  return t(usdIntlKey, { balance, isApproximate });
};
