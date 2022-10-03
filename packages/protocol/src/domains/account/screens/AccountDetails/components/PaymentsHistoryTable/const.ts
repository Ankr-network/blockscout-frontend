import { PaymentHistoryTableTimeframe } from 'domains/account/types';
import {
  AggregatedPaymentHistoryTimeGroup,
  IPaymentHistoryEntityType,
} from 'multirpc-sdk';

export const DEFAULT_LIMIT = 15;

export const DEFAULT_TIME_GROUP = AggregatedPaymentHistoryTimeGroup.DAY;

export const DEFAULT_TIMEFRAME = PaymentHistoryTableTimeframe.WEEK;

const DAY_OFFSET = 24 * 60 * 60 * 1000;

export const WEEK_OFFSET = DAY_OFFSET * 7;
export const MONTH_OFFSET = DAY_OFFSET * 31;
export const YEAR_OFFSET = DAY_OFFSET * 365;

export const MIN_ANKR_DECIMAL_PLACES = 2;
export const MAX_ANKR_DECIMAL_PLACES = 5;

export const MIN_USD_DECIMAL_PLACES = 2;
export const MAX_USD_DECIMAL_PLACES = 7;

export const MIN_CREDIT_DECIMAL_PLACES = 0;
export const MAX_CREDIT_DECIMAL_PLACES = 0;

export const PAYMENT_HISTORY_TYPE: Record<IPaymentHistoryEntityType, string> = {
  TRANSACTION_TYPE_UNKNOWN: 'Unknown',
  TRANSACTION_TYPE_DEPOSIT: 'Top Up',
  TRANSACTION_TYPE_DEDUCTION: 'Payment charging',
  TRANSACTION_TYPE_WITHDRAW: 'Withdrawal',
  TRANSACTION_TYPE_BONUS: 'Bonus',
  TRANSACTION_TYPE_COMPENSATION: 'Compensation',

  TRANSACTION_TYPE_VOUCHER_TOPUP: 'Voucher Credits Accrual',
  TRANSACTION_TYPE_VOUCHER_ADJUST: 'Voucher Credits Adjustment',
  TRANSACTION_TYPE_WITHDRAW_INIT: 'Withdrawal Request',
  TRANSACTION_TYPE_WITHDRAW_ADJUST: 'Withdrawal Adjust',
};
