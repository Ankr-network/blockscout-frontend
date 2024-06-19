import { IAmount } from 'modules/payments/types';

export interface IGetAmountIDByAmountValueParams {
  amounts: IAmount[];
  amount: number;
}

export const getAmountIDByAmountValue = ({
  amount,
  amounts,
}: IGetAmountIDByAmountValueParams) =>
  amounts.find(({ value }) => value === amount)?.id;
