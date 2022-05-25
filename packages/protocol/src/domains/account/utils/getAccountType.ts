import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';

export interface AccountTypeParams {
  balance: BigNumber;
  balanceEndTime: number;
  premiumUntil?: Date;
}

type Condition = (params: AccountTypeParams) => boolean;

const PAYG_WARNING_THRESHOLD = 6;

const conditionsMap = new Map<AccountType, Condition>([
  [
    AccountType.PAYG_ACTIVE,
    ({ balance, balanceEndTime, premiumUntil }) =>
      !premiumUntil &&
      balanceEndTime > PAYG_WARNING_THRESHOLD &&
      balance.isPositive(),
  ],
  [
    AccountType.PAYG_INACTIVE,
    ({ balance, premiumUntil }) => !premiumUntil && balance.lte(0),
  ],
  [
    AccountType.PAYG_UNKNOWN,
    ({ balance, balanceEndTime, premiumUntil }) =>
      !premiumUntil && balanceEndTime === -1 && balance.eq(0),
  ],
  [
    AccountType.PAYG_UNKNOWN_WITH_BALANCE,
    ({ balance, balanceEndTime, premiumUntil }) =>
      !premiumUntil && balanceEndTime === -1 && balance.gt(0),
  ],
  [
    AccountType.PAYG_WARNING,
    ({ balanceEndTime, premiumUntil }) =>
      !premiumUntil &&
      balanceEndTime <= PAYG_WARNING_THRESHOLD &&
      balanceEndTime > 0,
  ],
  [
    AccountType.PAYG_WARNING_ZERO,
    ({ balance, balanceEndTime, premiumUntil }) =>
      !premiumUntil && balanceEndTime === 0 && balance.gt(0),
  ],
  [
    AccountType.PREMIUM,
    ({ premiumUntil }) =>
      !!premiumUntil && premiumUntil.getTime() - new Date().getTime() > 0,
  ],
  [
    AccountType.PREMIUM_EXPIRED,
    ({ premiumUntil }) =>
      !!premiumUntil && premiumUntil.getTime() - new Date().getTime() <= 0,
  ],
]);

export const getAccountType = (params: AccountTypeParams): AccountType => {
  const [type] = Array.from(conditionsMap).find(([, condition]) =>
    condition(params),
  ) || [AccountType.PAYG_ACTIVE];

  return type;
};
