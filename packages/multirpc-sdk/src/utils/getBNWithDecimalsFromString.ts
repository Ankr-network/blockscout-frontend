import BigNumber from "bignumber.js"

import { TEN } from "../common/const"

export const getBNWithDecimalsFromString = (value: string | BigNumber, decimals: number) => {
  return new BigNumber(value).dividedBy(TEN.pow(decimals));
}