import { AccountType, BalanceStatus } from 'domains/account/types';

const { GREEN, GREY, RED, YELLOW } = BalanceStatus;

const statusesMap: Record<AccountType, BalanceStatus> = {
  [AccountType.FREEMIUM]: RED,
  [AccountType.FREEMIUM_TRANSITION]: GREY,
  [AccountType.OLD_PREMIUM]: GREEN,
  [AccountType.OLD_PREMIUM_EXPIRED]: RED,
  [AccountType.PREMIUM_ACTIVE]: GREEN,
  [AccountType.PREMIUM_WARNING]: YELLOW,
  [AccountType.PREMIUM_MIN_BALANCE]: RED,
  [AccountType.PREMIUM_INACTIVE]: RED,
};

export const getBalanceStatus = (type: AccountType) => statusesMap[type];
