import BigNumber from 'bignumber.js';

import { AccountType } from 'domains/account/types';
import { formatBalance } from 'domains/account/utils/formatBalance';
import { i18nKeyRoot } from '../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

export interface GetDescriptionsParams {
  accountType: AccountType;
  premiumUntil?: Date;
  usdBalance: BigNumber;
}

type Getter = (params: GetDescriptionsParams) => string;

const root = `${i18nKeyRoot}.descriptions`;

const getUsdBalance = ({ usdBalance: usd }: GetDescriptionsParams) =>
  usd.gt(0) ? `~$${formatBalance(usd)}` : '';

const descriptionsMap: Record<AccountType, [Getter, Getter]> = {
  [AccountType.PAYG_ACTIVE]: [
    getUsdBalance,
    () => t(`${root}.payg-active.extra`),
  ],
  [AccountType.PAYG_INACTIVE]: [
    getUsdBalance,
    () => t(`${root}.payg-inactive.extra`),
  ],
  [AccountType.PAYG_UNKNOWN]: [getUsdBalance, () => ''],
  [AccountType.PAYG_UNKNOWN_WITH_BALANCE]: [getUsdBalance, () => ''],
  [AccountType.PAYG_WARNING]: [
    getUsdBalance,
    () => t(`${root}.payg-warning.extra`),
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
