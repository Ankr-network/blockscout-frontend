import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { AccountType } from 'domains/account/types';
import { formatBalance } from 'domains/account/utils/formatBalance';

import { root as i18nKeyRoot } from '../../../const';

export interface GetDescriptionsParams {
  accountType: AccountType;
  premiumUntil?: Date;
  usdBalance: BigNumber;
  creditBalance: BigNumber;
}

type Getter = (params: GetDescriptionsParams) => string;

const root = `${i18nKeyRoot}.descriptions`;

const PRICE_FOR_ONE_REQUEST = 200;

const getDescription = (creditBalance: BigNumber, key: string) => {
  return t(`${root}.${key}.extra`, {
    requests: creditBalance.dividedToIntegerBy(PRICE_FOR_ONE_REQUEST),
  });
};

const getUsdBalance = ({ usdBalance: usd }: GetDescriptionsParams) =>
  usd.gt(0) ? `~$${formatBalance(usd)}` : '';

const descriptionsMap: Record<AccountType, [Getter, Getter]> = {
  [AccountType.FREEMIUM]: [getUsdBalance, () => t(`${root}.freemium.extra`)],
  [AccountType.FREEMIUM_TRANSITION]: [
    getUsdBalance,
    () => t(`${root}.freemium-transition.extra`),
  ],
  [AccountType.OLD_PREMIUM]: [
    ({ premiumUntil: date }) => t(`${root}.old-premium.main`, { date }),
    () => t(`${root}.old-premium.extra`),
  ],
  [AccountType.OLD_PREMIUM_EXPIRED]: [
    () => t(`${root}.old-premium-expired.main`),
    () => t(`${root}.old-premium-expired.extra`),
  ],
  [AccountType.PREMIUM_ACTIVE]: [
    getUsdBalance,
    ({ creditBalance }) => getDescription(creditBalance, 'premium-active'),
  ],
  [AccountType.PREMIUM_WARNING]: [
    getUsdBalance,
    ({ creditBalance }) => getDescription(creditBalance, 'premium-warning'),
  ],
  [AccountType.PREMIUM_MIN_BALANCE]: [
    getUsdBalance,
    ({ creditBalance }) => getDescription(creditBalance, 'premium-min-balance'),
  ],
  [AccountType.PREMIUM_INACTIVE]: [
    getUsdBalance,
    () => t(`${root}.premium-inactive.extra`),
  ],
};

export const getDescriptions = (
  params: GetDescriptionsParams,
): [string, string] => {
  const [getMainDescription, getExtraDescription] =
    descriptionsMap[params.accountType];

  return [getMainDescription(params), getExtraDescription(params)];
};
