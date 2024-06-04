export interface IHasPartialAllowanceParams {
  amount: number;
  allowance: number;
}

export const hasPartialAllowance = ({
  amount,
  allowance,
}: IHasPartialAllowanceParams) => {
  const isAmountPositive = amount > 0;
  const isAmountBiggerThanAllowance = amount > allowance;
  const isAllowancePositive = allowance > 0;

  return isAmountPositive && isAllowancePositive && isAmountBiggerThanAllowance;
};
