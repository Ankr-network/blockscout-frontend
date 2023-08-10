import { ANKR_CURRENCY } from 'domains/account/actions/topUp/const';
import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

export type AmountValidator = (amount: string) => string | undefined;

export type Currency = typeof ANKR_CURRENCY | typeof USD_CURRENCY;
