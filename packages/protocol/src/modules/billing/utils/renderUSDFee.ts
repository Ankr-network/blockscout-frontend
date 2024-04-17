import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

export interface IRenderUSDFeeParams {
  fee: number;
  isApproximate?: boolean;
}

export const renderUSDFee = ({
  fee: rawFee,
  isApproximate,
}: IRenderUSDFeeParams) => {
  const fee = new BigNumber(rawFee).toFixed(2);

  return t('account.amounts.fee.usd', { fee, isApproximate });
};
