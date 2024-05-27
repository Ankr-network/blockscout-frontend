import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import {
  LOW_APPROXIMATED_USD,
  USD_DECIMALS,
} from 'modules/common/constants/const';

export interface IRenderUSDFeeParams {
  fee: number;
  isApproximate?: boolean;
}

export const renderUSDFee = ({
  fee: rawFee,
  isApproximate,
}: IRenderUSDFeeParams) => {
  const value = new BigNumber(rawFee);

  const shouldShowSmallestValue = value.isLessThan(LOW_APPROXIMATED_USD);

  const fee = (shouldShowSmallestValue ? LOW_APPROXIMATED_USD : value)
    .decimalPlaces(USD_DECIMALS, BigNumber.ROUND_UP)
    .toFormat();

  return t('account.amounts.fee.usd', { fee, isApproximate });
};
