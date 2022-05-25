import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';

export interface AccountTypeParams {
  balance: BigNumber;
  balanceEndTime: number;
  premiumUntil?: Date;
}

type Condition = (params: AccountTypeParams) => boolean;

const conditionsMap = new Map<AccountType, Condition>([
  [
    AccountType.PAYG_WARNING,
    ({ balanceEndTime, premiumUntil }) =>
      !premiumUntil && balanceEndTime <= 5 && balanceEndTime > 0,
  ],
  [
    AccountType.PAYG_INACTIVE,
    ({ balanceEndTime, premiumUntil }) => !premiumUntil && balanceEndTime === 0,
  ],
  [
    AccountType.PAYG_UNKNOWN,
    ({ balance, balanceEndTime, premiumUntil }) =>
      !premiumUntil && balanceEndTime === -1 && balance.eq(0),
  ],
  [
    AccountType.PAYG_UNKNOWN_WITH_BALANCE,
    ({ balanceEndTime, premiumUntil, balance }) =>
      !premiumUntil && balanceEndTime === -1 && balance.gt(0),
  ],
  [
    AccountType.PAYG_ACTIVE,
    ({ balanceEndTime, premiumUntil }) => !premiumUntil && balanceEndTime > 5,
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
