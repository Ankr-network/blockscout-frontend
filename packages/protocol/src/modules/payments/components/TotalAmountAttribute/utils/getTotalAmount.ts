export interface IGetTotalAmountParams {
  amountUsd: number;
  allowanceFeeUSD?: number;
  depositFeeUSD: number;
}

export const getTotalAmount = ({
  amountUsd,
  allowanceFeeUSD = 0,
  depositFeeUSD,
}: IGetTotalAmountParams) => amountUsd + depositFeeUSD + allowanceFeeUSD;
