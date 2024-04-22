import BigNumber from 'bignumber.js';

export interface IHasFullApprovalParams {
  amountToDeposit: BigNumber;
  isAllowanceSent?: boolean;
  myAllowance: number;
}

export const hasFullApproval = ({
  amountToDeposit,
  isAllowanceSent,
  myAllowance,
}: IHasFullApprovalParams) => {
  const amountToDepositNumber = amountToDeposit.toNumber();
  const isAmountPositive = amountToDepositNumber > 0;
  const isAmountLessThanAllowance = amountToDepositNumber <= myAllowance;

  return isAmountPositive && isAmountLessThanAllowance && !isAllowanceSent;
};
