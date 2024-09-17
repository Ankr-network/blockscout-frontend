import BigNumber from 'bignumber.js';

import { getSign } from 'modules/common/utils/getSign';

export interface IFormatAmountParams {
  amount: number;
  hasSign?: boolean;
}

export const formatAmount = ({ amount, hasSign }: IFormatAmountParams) => {
  const prefix = hasSign ? getSign(amount) : '';

  return prefix + new BigNumber(amount).toFormat();
};
