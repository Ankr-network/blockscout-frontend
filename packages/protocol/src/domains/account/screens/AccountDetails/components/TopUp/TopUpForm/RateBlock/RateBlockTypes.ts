import { ANKR_CURRENCY } from 'domains/account/actions/topUp/const';
import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

export type CurrencyType = typeof ANKR_CURRENCY | typeof USD_CURRENCY;
