import { IFeeDetails } from '../types';

export interface IGetTotalFeeDetails {
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
}

export const getTotalFeeDetails = ({
  approvalFeeDetails,
  depositFeeDetails,
}: IGetTotalFeeDetails): IFeeDetails => ({
  feeCrypto: approvalFeeDetails.feeCrypto + depositFeeDetails.feeCrypto,
  feeUSD: approvalFeeDetails.feeUSD + depositFeeDetails.feeUSD,
});
