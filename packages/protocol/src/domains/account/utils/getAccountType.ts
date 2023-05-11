import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';

export interface AccountTypeParams {
  balance: BigNumber;
  balanceEndTime: number;
  hasFreeToPremiumTransition: boolean;
  hasPremium: boolean;
  isFreePremium: boolean;
  isOldPremium: boolean;
  isTokenExpired: boolean;
}

type Condition = (params: AccountTypeParams) => boolean;

type PartialParams = Partial<AccountTypeParams>;

const PREMIUM_WARNING_THRESHOLD = 6;

const isPremium = ({ hasPremium, isOldPremium }: PartialParams) =>
  Boolean(hasPremium && !isOldPremium);

const isFreemium = ({ isFreePremium }: PartialParams) => Boolean(isFreePremium);

const isFreemiumTransition: Condition = ({ hasFreeToPremiumTransition }) =>
  hasFreeToPremiumTransition;

const isPremiumActive: Condition = ({ balance, balanceEndTime, ...rest }) =>
  isPremium(rest) &&
  balanceEndTime > PREMIUM_WARNING_THRESHOLD &&
  balance.isPositive();

const isPremiumInactive: Condition = ({ balance, ...rest }) =>
  isPremium(rest) && balance.lte(0);

const isPremiumUnknown: Condition = ({ balance, balanceEndTime, ...rest }) =>
  isPremium(rest) && balanceEndTime === -1 && balance.eq(0);

const isPremiumUnknownWithBalance: Condition = ({
  balance,
  balanceEndTime,
  ...rest
}) => isPremium(rest) && balanceEndTime === -1 && balance.gt(0);

const isPremiumWarning: Condition = ({ balanceEndTime, ...rest }) =>
  isPremium(rest) &&
  balanceEndTime <= PREMIUM_WARNING_THRESHOLD &&
  balanceEndTime > 0;

const isPremiumWarningZero: Condition = ({
  balance,
  balanceEndTime,
  ...rest
}) => isPremium(rest) && balanceEndTime === 0 && balance.gt(0);

const isOldPremiumUser: Condition = ({ isOldPremium, isTokenExpired }) =>
  isOldPremium && !isTokenExpired;

const isOldPremiumExpired: Condition = ({ isOldPremium, isTokenExpired }) =>
  isOldPremium && isTokenExpired;

const conditionsMap = new Map<AccountType, Condition>([
  [AccountType.FREEMIUM_TRANSITION, isFreemiumTransition],
  [AccountType.FREEMIUM, isFreemium],
  [AccountType.PREMIUM_ACTIVE, isPremiumActive],
  [AccountType.PREMIUM_INACTIVE, isPremiumInactive],
  [AccountType.PREMIUM_UNKNOWN, isPremiumUnknown],
  [AccountType.PREMIUM_UNKNOWN_WITH_BALANCE, isPremiumUnknownWithBalance],
  [AccountType.PREMIUM_WARNING, isPremiumWarning],
  [AccountType.PREMIUM_WARNING_ZERO, isPremiumWarningZero],
  [AccountType.OLD_PREMIUM, isOldPremiumUser],
  [AccountType.OLD_PREMIUM_EXPIRED, isOldPremiumExpired],
]);

export const getAccountType = (params: AccountTypeParams): AccountType => {
  const [type] = Array.from(conditionsMap).find(([, condition]) =>
    condition(params),
  ) || [AccountType.PREMIUM_ACTIVE];

  return type;
};
