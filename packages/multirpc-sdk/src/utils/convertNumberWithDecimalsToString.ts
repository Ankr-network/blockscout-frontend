import BigNumber from "bignumber.js"

import { TEN } from '../common/const';

export const convertNumberWithDecimalsToString = (amount: number | string | BigNumber, decimals: number) => {
  return new BigNumber(amount).multipliedBy(TEN.pow(decimals)).toFixed();
}