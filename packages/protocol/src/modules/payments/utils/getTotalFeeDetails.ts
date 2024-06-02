import { IFeeDetails } from '../types';

export interface IGetTotalFeeDetails {
  allowanceFeeDetails?: IFeeDetails;
  depositFeeDetails?: IFeeDetails;
}

const defaultFee: IFeeDetails = { feeCrypto: 0, feeUSD: 0 };

export const getTotalFeeDetails = ({
  allowanceFeeDetails = defaultFee,
  depositFeeDetails = defaultFee,
}: IGetTotalFeeDetails): IFeeDetails => ({
  feeCrypto: allowanceFeeDetails.feeCrypto + depositFeeDetails.feeCrypto,
  feeUSD: allowanceFeeDetails.feeUSD + depositFeeDetails.feeUSD,
});
