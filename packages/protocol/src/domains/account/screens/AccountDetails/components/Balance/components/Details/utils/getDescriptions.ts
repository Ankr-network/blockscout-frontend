import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';
import { ParsedDays } from './types';
import { formatBalance } from 'domains/account/utils/formatBalance';
import { getPeriod } from './getPeriod';
import { getQuantifier } from './getQuantifier';
import { root as i18nKeyRoot } from '../../../const';
import { t } from 'modules/i18n/utils/intl';

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
  [AccountType.NEW]: [getUsdBalance, () => t(`${root}.new.extra`)],
  [AccountType.PAYG_ACTIVE]: [
    getUsdBalance,
    ({ endTime: [time, period, quantifier] }) =>
      t(`${root}.payg-active.extra`, {
        time,
        period: getPeriod(time, period),
        quantifier: getQuantifier(quantifier),
      }),
  ],
  [AccountType.PAYG_INACTIVE]: [
    getUsdBalance,
    () => t(`${root}.payg-inactive.extra`),
  ],
  [AccountType.PAYG_UNKNOWN]: [getUsdBalance, () => ''],
  [AccountType.PAYG_UNKNOWN_WITH_BALANCE]: [getUsdBalance, () => ''],
  [AccountType.PAYG_WARNING]: [
    getUsdBalance,
    ({ endTime: [time, period, quantifier] }) =>
      t(`${root}.payg-warning.extra`, {
        time,
        period: getPeriod(time, period),
        quantifier: getQuantifier(quantifier),
      }),
  ],
  [AccountType.PAYG_WARNING_ZERO]: [
    getUsdBalance,
    () => t(`${root}.payg-warning-zero.extra`),
  ],
  [AccountType.PREMIUM]: [
    ({ premiumUntil: date }) => t(`${root}.premium.main`, { date }),
    () => t(`${root}.premium.extra`),
  ],
  [AccountType.PREMIUM_EXPIRED]: [
    () => t(`${root}.premium-expired.main`),
    () => t(`${root}.premium-expired.extra`),
  ],
};

export const getDescriptions = (
  params: GetDescriptionsParams,
): [string, string] => {
  const [getMainDescription, getExtraDescription] =
    descriptionsMap[params.accountType];

  return [getMainDescription(params), getExtraDescription(params)];
};
