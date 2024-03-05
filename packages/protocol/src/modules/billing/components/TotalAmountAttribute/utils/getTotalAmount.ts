export interface IGetTotalAmountParams {
  amountUSD: number;
  approvalFeeUSD?: number;
  depositFeeUSD: number;
}

export const getTotalAmount = ({
  amountUSD,
  approvalFeeUSD = 0,
  depositFeeUSD,
}: IGetTotalAmountParams) => amountUSD + depositFeeUSD + approvalFeeUSD;
