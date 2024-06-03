import { IFeeDetails } from '../types';
import { defaultFeeDetails } from '../const';
import { roundCryptoFee } from './roundCryptoFee';
import { roundUsdFee } from './roundUsdFee';

export interface IGetTotalFeeDetails {
  allowanceFeeDetails?: IFeeDetails;
  depositFeeDetails?: IFeeDetails;
  shouldRoundUp?: boolean;
}

export const getTotalFeeDetails = ({
  allowanceFeeDetails = defaultFeeDetails,
  depositFeeDetails = defaultFeeDetails,
  shouldRoundUp = false,
}: IGetTotalFeeDetails): IFeeDetails => {
  const feeCrypto = allowanceFeeDetails.feeCrypto + depositFeeDetails.feeCrypto;
  const feeUSD = allowanceFeeDetails.feeUSD + depositFeeDetails.feeUSD;

  // to avoid rounding to zero
  if (shouldRoundUp) {
    return {
      feeCrypto: roundCryptoFee({ feeCrypto }),
      feeUSD: roundUsdFee({ feeUSD }),
    };
  }

  return { feeCrypto, feeUSD };
};
