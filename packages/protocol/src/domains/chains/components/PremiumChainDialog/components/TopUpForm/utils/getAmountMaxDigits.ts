import { ANKR_MAX_DIGITS } from 'domains/account/actions/topUp/const';

const USD_MAX_DIGITS = 6;

export const getAmountMaxDigits = (isUSD: boolean) =>
  isUSD ? USD_MAX_DIGITS : ANKR_MAX_DIGITS;
