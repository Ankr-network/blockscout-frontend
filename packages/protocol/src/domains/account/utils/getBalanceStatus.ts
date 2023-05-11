import { AccountType, BalanceStatus } from 'domains/account/types';

const { GREEN, GREY, RED, YELLOW } = BalanceStatus;

const statusesMap: Record<AccountType, BalanceStatus> = {
  [AccountType.FREEMIUM]: RED,
  [AccountType.FREEMIUM_TRANSITION]: GREY,
  [AccountType.PREMIUM_ACTIVE]: GREEN,
  [AccountType.PREMIUM_INACTIVE]: RED,
  [AccountType.PREMIUM_UNKNOWN]: RED,
  [AccountType.PREMIUM_UNKNOWN_WITH_BALANCE]: GREEN,
  [AccountType.PREMIUM_WARNING]: YELLOW,
  [AccountType.PREMIUM_WARNING_ZERO]: YELLOW,
  [AccountType.OLD_PREMIUM]: GREEN,
  [AccountType.OLD_PREMIUM_EXPIRED]: RED,
};

export const getBalanceStatus = (type: AccountType) => statusesMap[type];
