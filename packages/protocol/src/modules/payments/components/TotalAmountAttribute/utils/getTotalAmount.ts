export interface IGetTotalAmountParams {
  amountUsd: number;
  allowanceFeeUSD?: number;
  depositFeeUSD: number;
}

export const getTotalAmount = ({
  allowanceFeeUSD = 0,
  amountUsd,
  depositFeeUSD,
}: IGetTotalAmountParams) => amountUsd + depositFeeUSD + allowanceFeeUSD;
