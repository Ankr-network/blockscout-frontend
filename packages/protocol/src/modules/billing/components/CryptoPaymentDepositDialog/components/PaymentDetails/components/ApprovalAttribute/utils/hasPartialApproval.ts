import BigNumber from 'bignumber.js';

export interface IHasPartialApprovalParams {
  amountToDeposit: BigNumber;
  myAllowance: number;
}

export const hasPartialApproval = ({
  amountToDeposit,
  myAllowance,
}: IHasPartialApprovalParams) => {
  const amountToDepositNumber = amountToDeposit.toNumber();

  const isAmountToDepositPositive = amountToDepositNumber > 0;
  const isAmountToDepositBiggerThanMyAllowance =
    amountToDepositNumber > myAllowance;
  const isMyAllowancePositive = myAllowance > 0;

  return (
    isAmountToDepositPositive &&
    isMyAllowancePositive &&
    isAmountToDepositBiggerThanMyAllowance
  );
};
