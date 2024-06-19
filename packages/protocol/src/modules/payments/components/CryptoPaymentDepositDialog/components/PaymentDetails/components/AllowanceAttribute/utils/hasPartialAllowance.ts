export interface IHasPartialAllowanceParams {
  amount: number;
  allowance: number;
}

export const hasPartialAllowance = ({
  allowance,
  amount,
}: IHasPartialAllowanceParams) => {
  const isAmountPositive = amount > 0;
  const isAmountBiggerThanAllowance = amount > allowance;
  const isAllowancePositive = allowance > 0;

  return isAmountPositive && isAllowancePositive && isAmountBiggerThanAllowance;
};
