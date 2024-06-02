export interface IGetTotalFeeParams {
  allowanceFee?: number;
  depositFee: number;
}

export const getTotalFee = ({
  allowanceFee = 0,
  depositFee,
}: IGetTotalFeeParams) => allowanceFee + depositFee;
