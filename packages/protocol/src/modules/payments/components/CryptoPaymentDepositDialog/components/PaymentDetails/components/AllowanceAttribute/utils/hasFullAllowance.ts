export interface IHasFullAllowanceParams {
  allowance: number;
  amount: number;
  isAllowanceSent?: boolean;
}

export const hasFullAllowance = ({
  allowance,
  amount,
  isAllowanceSent,
}: IHasFullAllowanceParams) => {
  const isAmountPositive = amount > 0;
  const isAmountLessThanAllowance = amount <= allowance;

  return isAmountPositive && isAmountLessThanAllowance && !isAllowanceSent;
};
