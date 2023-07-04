import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';

export interface AccountTypeParams {
  balance: BigNumber;
  hasFreeToPremiumTransition: boolean;
  hasPremium: boolean;
  hasPremiumToFreeTransition: boolean;
  isFreePremium: boolean;
  isOldPremium: boolean;
  isTokenExpired: boolean;
}

// red      balance < 50m
// yellow   50m <= balance < 100m
// green    balance >= 100m

const GREEN_BALANCE = new BigNumber(100_000_000);
const RED_BALANCE = new BigNumber(50_000_000);
const MIN_BALANCE = new BigNumber(-50_000_000);

type Condition = (params: AccountTypeParams) => boolean;

type PartialParams = Partial<AccountTypeParams>;

const isPremium = ({ hasPremium, isOldPremium }: PartialParams) =>
  Boolean(hasPremium && !isOldPremium);

const isFreemium = ({ isFreePremium }: PartialParams) => Boolean(isFreePremium);

const isFreemiumTransition: Condition = ({ hasFreeToPremiumTransition }) =>
  hasFreeToPremiumTransition;

const isPremiumActive: Condition = ({ balance, ...rest }) => {
  return isPremium(rest) && balance.isGreaterThanOrEqualTo(GREEN_BALANCE);
};

const isPremiumWarning: Condition = ({ balance, ...rest }) =>
  isPremium(rest) &&
  balance.isGreaterThanOrEqualTo(RED_BALANCE) &&
  balance.isLessThan(GREEN_BALANCE);

const isPremiumLowBalance: Condition = ({ balance, ...rest }) =>
  isPremium(rest) &&
  balance.isLessThan(RED_BALANCE) &&
  balance.isGreaterThan(MIN_BALANCE);

const isPremiumInactive: Condition = ({ balance, ...rest }) =>
  isPremium(rest) && balance.isLessThanOrEqualTo(MIN_BALANCE);

const isOldPremiumUser: Condition = ({ isOldPremium, isTokenExpired }) =>
  isOldPremium && !isTokenExpired;

const isOldPremiumExpired: Condition = ({ isOldPremium, isTokenExpired }) =>
  isOldPremium && isTokenExpired;

const conditionsMap: [AccountType, Condition][] = [
  [AccountType.FREEMIUM_TRANSITION, isFreemiumTransition],
  [AccountType.FREEMIUM, isFreemium],
  [AccountType.OLD_PREMIUM, isOldPremiumUser],
  [AccountType.OLD_PREMIUM_EXPIRED, isOldPremiumExpired],
  [AccountType.PREMIUM_ACTIVE, isPremiumActive],
  [AccountType.PREMIUM_WARNING, isPremiumWarning],
  [AccountType.PREMIUM_MIN_BALANCE, isPremiumLowBalance],
  [AccountType.PREMIUM_INACTIVE, isPremiumInactive],
];

export const getAccountType = (params: AccountTypeParams): AccountType => {
  const [type] = conditionsMap.find(([, condition]) => condition(params)) || [
    AccountType.PREMIUM_ACTIVE,
  ];

  return type;
};
