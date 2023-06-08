import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';
import { ParsedDays } from './types';
import { formatBalance } from 'domains/account/utils/formatBalance';
import { getPeriod } from './getPeriod';
import { getQuantifier } from './getQuantifier';
import { root as i18nKeyRoot } from '../../../const';
import { t } from '@ankr.com/common';

export interface GetDescriptionsParams {
  accountType: AccountType;
  endTime: ParsedDays;
  premiumUntil?: Date;
  usdBalance: BigNumber;
}

type Getter = (params: GetDescriptionsParams) => string;

const root = `${i18nKeyRoot}.descriptions`;

const getUsdBalance = ({ usdBalance: usd }: GetDescriptionsParams) =>
  usd.gt(0) ? `~$${formatBalance(usd)}` : '';

const descriptionsMap: Record<AccountType, [Getter, Getter]> = {
  [AccountType.FREEMIUM]: [getUsdBalance, () => t(`${root}.freemium.extra`)],
  [AccountType.FREEMIUM_TRANSITION]: [
    getUsdBalance,
    () => t(`${root}.freemium-transition.extra`),
  ],
  [AccountType.PREMIUM_TRANSITION]: [
    getUsdBalance,
    () => t(`${root}.premium-transition.extra`),
  ],
  [AccountType.PREMIUM_ACTIVE]: [
    getUsdBalance,
    ({ endTime: [time, period, quantifier] }) =>
      t(`${root}.premium-active.extra`, {
        time,
        period: getPeriod(time, period),
        quantifier: getQuantifier(quantifier),
      }),
  ],
  [AccountType.PREMIUM_INACTIVE]: [
    getUsdBalance,
    () => t(`${root}.premium-inactive.extra`),
  ],
  [AccountType.PREMIUM_UNKNOWN]: [getUsdBalance, () => ''],
  [AccountType.PREMIUM_UNKNOWN_WITH_BALANCE]: [getUsdBalance, () => ''],
  [AccountType.PREMIUM_WARNING]: [
    getUsdBalance,
    ({ endTime: [time, period, quantifier] }) =>
      t(`${root}.premium-warning.extra`, {
        time,
        period: getPeriod(time, period),
        quantifier: getQuantifier(quantifier),
      }),
  ],
  [AccountType.PREMIUM_WARNING_ZERO]: [
    getUsdBalance,
    () => t(`${root}.premium-warning-zero.extra`),
  ],
  [AccountType.OLD_PREMIUM]: [
    ({ premiumUntil: date }) => t(`${root}.old-premium.main`, { date }),
    () => t(`${root}.old-premium.extra`),
  ],
  [AccountType.OLD_PREMIUM_EXPIRED]: [
    () => t(`${root}.old-premium-expired.main`),
    () => t(`${root}.old-premium-expired.extra`),
  ],
};

export const getDescriptions = (
  params: GetDescriptionsParams,
): [string, string] => {
  const [getMainDescription, getExtraDescription] =
    descriptionsMap[params.accountType];

  return [getMainDescription(params), getExtraDescription(params)];
};
