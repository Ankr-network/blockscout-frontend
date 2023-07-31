import { BalanceLevel, IBalance } from 'multirpc-sdk';

export const ALL_BLOCKCHAINS_PATH = '*';

export const ANKR_TO_CREDITS_RATE = 1_000_000;

export const DEFAULT_BALANCE: IBalance = {
  balance: '0',
  balance_ankr: '0',
  balance_credit_ankr: '0',
  balance_credit_usd: '0',
  balance_level: BalanceLevel.RED,
  balance_usd: '0',
  balance_voucher: '0',
};
