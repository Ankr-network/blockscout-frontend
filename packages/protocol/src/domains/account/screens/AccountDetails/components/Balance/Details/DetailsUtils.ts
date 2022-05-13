import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';
import { formatBalance } from 'domains/account/utils/formatBalance';
import { i18nKeyRoot } from '../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

export interface GetDescriptionsParams {
  premiumUntil?: Date;
  status: AccountStatus;
  usdBalance: BigNumber;
}

const root = `${i18nKeyRoot}.descriptions`;

const getPremiumDescription = (date: Date) =>
  t(`${root}.premium.main`, { date });

const getPremiumExtraDescription = () => t(`${root}.premium.extra`);

const getUsdBalance = (usd: BigNumber) =>
  usd.gt(0) ? `~$${formatBalance(usd)}` : '';

const getPAYGExtraDescription = (status: AccountStatus) =>
  status === AccountStatus.INACTIVE ? t(`${root}.payg.extra`) : '';

export const getDescriptions = ({
  premiumUntil,
  status,
  usdBalance,
}: GetDescriptionsParams): [string, string] =>
  premiumUntil
    ? [getPremiumDescription(premiumUntil), getPremiumExtraDescription()]
    : [getUsdBalance(usdBalance), getPAYGExtraDescription(status)];
