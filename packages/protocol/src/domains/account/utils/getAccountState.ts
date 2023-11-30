import BigNumber from 'bignumber.js';
import { BalanceLevel, PremiumStatus } from 'multirpc-sdk';

import { getPremiumActivationThreshold } from 'domains/auth/utils/getPremiumActivationThreshold';

import { AccountIcon, AccountState, AccountStatus } from '../types';

export interface AccountStateParams {
  balance?: string;
  balanceLevel: BalanceLevel;
  hasFreemium: boolean;
  hasPremium: boolean;
  hasRolePermission?: boolean;
  hasTransition: boolean;
  premiumStatus?: PremiumStatus;
}

const checkIsNewAccount = ({
  balance = '',
  balanceLevel,
  hasFreemium,
}: Pick<AccountStateParams, 'balance' | 'balanceLevel' | 'hasFreemium'>) =>
  hasFreemium &&
  (balanceLevel === BalanceLevel.UNKNOWN ||
    new BigNumber(balance).isLessThan(getPremiumActivationThreshold()));

const getPremiumAccountState = ({
  balanceLevel,
  premiumStatus,
}: Pick<
  AccountStateParams,
  'balanceLevel' | 'premiumStatus'
>): AccountState => {
  if (premiumStatus === PremiumStatus.INACTIVE) {
    return {
      descriptionKey: 'account.descriptions.critical',
      icon: AccountIcon.ERROR,
      isPAYG: true,
      status: AccountStatus.RED,
    };
  }

  const hasRedStatus =
    balanceLevel === BalanceLevel.ZERO ||
    balanceLevel === BalanceLevel.CRITICAL ||
    balanceLevel === BalanceLevel.TOO_LOW ||
    balanceLevel === BalanceLevel.RED;

  if (hasRedStatus) {
    return {
      descriptionKey: 'account.descriptions.red',
      icon: AccountIcon.ERROR,
      isPAYG: true,
      status: AccountStatus.RED,
    };
  }

  if (balanceLevel === BalanceLevel.YELLOW) {
    return {
      descriptionKey: 'account.descriptions.yellow',
      icon: AccountIcon.WARNING,
      isPAYG: true,
      status: AccountStatus.YELLOW,
    };
  }

  if (balanceLevel === BalanceLevel.GREEN) {
    return { isPAYG: true, status: AccountStatus.GREEN };
  }

  return { isPAYG: false, status: AccountStatus.RED };
};

const getUnpermittedRoleAccountState = (balanceLevel: BalanceLevel) => {
  if (balanceLevel === BalanceLevel.TOO_LOW) {
    return {
      descriptionKey: 'account.descriptions.critical',
      icon: AccountIcon.ERROR,
      isPAYG: true,
      status: AccountStatus.RED,
    };
  }

  const hasRedStatus =
    balanceLevel === BalanceLevel.ZERO ||
    balanceLevel === BalanceLevel.CRITICAL ||
    balanceLevel === BalanceLevel.RED;

  if (hasRedStatus) {
    return {
      descriptionKey: 'account.descriptions.red',
      icon: AccountIcon.ERROR,
      isPAYG: true,
      status: AccountStatus.RED,
    };
  }

  if (balanceLevel === BalanceLevel.YELLOW) {
    return {
      descriptionKey: 'account.descriptions.yellow',
      icon: AccountIcon.WARNING,
      isPAYG: true,
      status: AccountStatus.YELLOW,
    };
  }

  if (balanceLevel === BalanceLevel.GREEN) {
    return { isPAYG: true, status: AccountStatus.GREEN };
  }

  return { isPAYG: false, status: AccountStatus.RED };
};

export const getAccountState = ({
  balance,
  balanceLevel,
  hasFreemium,
  hasPremium,
  hasRolePermission,
  hasTransition,
  premiumStatus,
}: AccountStateParams): AccountState => {
  if (hasTransition) {
    return {
      descriptionKey: 'account.descriptions.grey',
      isPAYG: false,
      status: AccountStatus.GREY,
    };
  }

  if (checkIsNewAccount({ balance, balanceLevel, hasFreemium })) {
    return {
      descriptionKey: 'account.descriptions.blue',
      icon: AccountIcon.INFO,
      isPAYG: false,
      status: AccountStatus.RED,
    };
  }

  if (!hasRolePermission) {
    return getUnpermittedRoleAccountState(balanceLevel);
  }

  if (hasPremium) {
    return getPremiumAccountState({ balanceLevel, premiumStatus });
  }

  return { isPAYG: false, status: AccountStatus.RED };
};
