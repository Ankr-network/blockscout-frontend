import { AccountType, BalanceStatus } from 'domains/account/types';

const { GREEN, RED, YELLOW } = BalanceStatus;

const statusesMap: Record<AccountType, BalanceStatus> = {
  [AccountType.PAYG_ACTIVE]: GREEN,
  [AccountType.PAYG_INACTIVE]: RED,
  [AccountType.PAYG_UNKNOWN]: RED,
  [AccountType.PAYG_UNKNOWN_WITH_BALANCE]: GREEN,
  [AccountType.PAYG_WARNING]: YELLOW,
  [AccountType.PAYG_WARNING_ZERO]: YELLOW,
  [AccountType.PREMIUM]: GREEN,
  [AccountType.PREMIUM_EXPIRED]: RED,
};

export const getBalanceStatus = (type: AccountType): BalanceStatus =>
  statusesMap[type];
