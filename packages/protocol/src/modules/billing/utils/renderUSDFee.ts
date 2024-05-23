import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { LOW_APPROXIMATE_LIMIT_USD } from 'modules/common/constants/const';

export interface IRenderUSDFeeParams {
  fee: number;
  isApproximate?: boolean;
}

export const renderUSDFee = ({
  fee: rawFee,
  isApproximate,
}: IRenderUSDFeeParams) => {
  const value = new BigNumber(rawFee);

  const shouldExpandDecimals = value.isLessThan(LOW_APPROXIMATE_LIMIT_USD);

  const fee = value.toFixed(shouldExpandDecimals ? 5 : 2);

  return t('account.amounts.fee.usd', { fee, isApproximate });
};
