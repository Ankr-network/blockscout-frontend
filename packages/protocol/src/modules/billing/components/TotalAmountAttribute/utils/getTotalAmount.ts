export interface IGetTotalAmountParams {
  amountUsd: number;
  approvalFeeUSD?: number;
  depositFeeUSD: number;
}

export const getTotalAmount = ({
  amountUsd,
  approvalFeeUSD = 0,
  depositFeeUSD,
}: IGetTotalAmountParams) => amountUsd + depositFeeUSD + approvalFeeUSD;
