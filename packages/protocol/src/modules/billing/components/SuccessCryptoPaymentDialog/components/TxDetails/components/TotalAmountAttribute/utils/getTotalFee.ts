export interface IGetTotalFeeParams {
  approvalFee?: number;
  depositFee: number;
}

export const getTotalFee = ({
  approvalFee = 0,
  depositFee,
}: IGetTotalFeeParams) => approvalFee + depositFee;
