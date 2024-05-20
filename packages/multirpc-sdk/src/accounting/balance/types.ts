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

// production values for user balance in api credits are in the comments.
export enum BalanceLevel {
  // balance >= -10m Api Credits
  CRITICAL = 'CRITICAL',
  // balance >= 100m Api Credits
  GREEN = 'GREEN',
  // balance >= 10m Api Credits
  RED = 'RED',
  // balance >= -50m Api Credits
  TOO_LOW = 'TOO_LOW',
  // balance has never been topped up
  UNKNOWN = 'UNKNOWN',
  // balance >= 50m Api Credits
  YELLOW = 'YELLOW',
  // balance = 0 Api Credits
  ZERO = 'ZERO',
}
