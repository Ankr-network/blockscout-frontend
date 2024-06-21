import { t } from '@ankr.com/common';

import { IFeeDetails } from '../types';
import { processLowFeeDetails } from './processLowFeeDetails';
import { roundUsdFee } from './roundUsdFee';

export interface IRenderUSDFeeParams {
  fee: number;
  isApproximate?: boolean;
}

export const renderUSDFee = ({
  fee: feeUSD,
  isApproximate,
}: IRenderUSDFeeParams) => {
  const feeDetails: IFeeDetails = { feeCrypto: 0, feeUSD };

  const { feeUSD: feeUSDProcessed } = processLowFeeDetails({ feeDetails });

  const fee = roundUsdFee({ feeUSD: feeUSDProcessed });

  return t('account.amounts.fee.usd', { fee, isApproximate });
};
