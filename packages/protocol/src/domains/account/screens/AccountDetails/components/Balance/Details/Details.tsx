import React from 'react';
import BigNumber from 'bignumber.js';

import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountStatus, Tier } from 'multirpc-sdk';
import { EnoughTime } from '../types';
import { formatBalance } from 'domains/account/utils/formatBalance';
import { getDescriptionGetter } from './DetailsUtils';
import { i18nKeyRoot } from '../BalanceUtils';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './DetailsStyles';

export interface DetailsProps {
  enoughTime: EnoughTime;
  premiumUntil?: Date;
  status: AccountStatus;
  tier?: Tier;
  usdBalance: BigNumber;
}

export const Details = ({
  enoughTime,
  premiumUntil,
  tier,
  status,
  usdBalance: _usdBalance,
}: DetailsProps) => {
  const isPremium = !!premiumUntil;

  const classes = useStyles(isPremium);

  const usdBalance = isPremium
    ? t(`${i18nKeyRoot}.description.premium.text`, { date: premiumUntil })
    : `~$${formatBalance(_usdBalance)}`;

  const description = getDescriptionGetter(tier)({ enoughTime });
  const details = (
    <>
      <span className={classes.usdBalance}>{usdBalance}</span>
      <span className={classes.description}>{description}</span>
    </>
  );
  const content = isPremium ? (
    <div className={classes.details}>{details}</div>
  ) : (
    details
  );

  return (
    <div className={classes.detailsRoot}>
      <div className={classes.marker}>
        <AccountMarker status={status} />
      </div>
      {content}
    </div>
  );
};
