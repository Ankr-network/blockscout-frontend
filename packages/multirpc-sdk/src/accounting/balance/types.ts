export interface IBalance {
  // total balance (including voucher) in credits
  balance: string;
  // total balance in ankrs
  balance_ankr: string;
  // total ankr top up in credits
  balance_credit_ankr: string;
  // total usd top up in credits
  balance_credit_usd: string;
  balance_level: BalanceLevel;
  // total balance in usd
  balance_usd: string;
  // voucher balance
  balance_voucher: string;
}

export enum BalanceLevel {
  CRITICAL = 'CRITICAL',
  GREEN = 'GREEN',
  RED = 'RED',
  TOO_LOW = 'TOO_LOW',
  // balance has never been topped up
  UNKNOWN = 'UNKNOWN',
  YELLOW = 'YELLOW',
  ZERO = 'ZERO',
}