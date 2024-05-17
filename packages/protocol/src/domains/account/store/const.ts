import { BalanceLevel, IBalance } from 'multirpc-sdk';

export const ALL_BLOCKCHAINS_PATH = '*';

export const ANKR_TO_CREDITS_RATE = 1_000_000;

// this value is different for staqe and prod
// stage has 50_000 value
// related discussion: https://ankr.slack.com/archives/C0482JES71T/p1715849383636179
export const NEGATIVE_BALANCE_EXTRA_CREDITS_COUNT = 50_000_000;

export const CREDITS_TO_REQUESTS_RATE = 200;

export const CREDITS_TO_USD_RATE = 10000000;

export const ZERO_STRING = '0';
export const ONE_STRING = '1';

export const DEFAULT_BALANCE: IBalance = {
  balance: ZERO_STRING,
  balance_ankr: ZERO_STRING,
  balance_credit_ankr: ZERO_STRING,
  balance_credit_usd: ZERO_STRING,
  balance_level: BalanceLevel.RED,
  balance_usd: ZERO_STRING,
  balance_voucher: ZERO_STRING,
};
