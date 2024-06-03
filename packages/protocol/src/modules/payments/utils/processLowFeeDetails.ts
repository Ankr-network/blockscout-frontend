import BigNumber from 'bignumber.js';

import { IFeeDetails } from '../types';
import { MIN_CRYPTO_FEE, MIN_USD_FEE } from '../const';

export interface IProcessLowFeeDetailsParams {
  feeDetails: IFeeDetails;
}

// If a fee less then the minimal fee we should display the minimal fee instead
// to avoid collisions with rounding numbers
export const processLowFeeDetails = ({
  feeDetails,
}: IProcessLowFeeDetailsParams): IFeeDetails => {
  const feeCrypto = new BigNumber(feeDetails.feeCrypto).lt(MIN_CRYPTO_FEE)
    ? MIN_CRYPTO_FEE
    : feeDetails.feeCrypto;

  const feeUSD = new BigNumber(feeDetails.feeUSD).lt(MIN_USD_FEE)
    ? MIN_USD_FEE
    : feeDetails.feeUSD;

  return { feeCrypto, feeUSD };
};
