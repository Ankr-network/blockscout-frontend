import React from 'react';
import BigNumber from 'bignumber.js';

import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountStatus } from 'multirpc-sdk';
import { EnoughTime, ServiceType } from '../types';
import { formatNumber, i18nKeyRoot } from '../BalanceUtils';
import { serviceTypeToDescriptionMap } from './DetailsUtils';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './DetailsStyles';

export interface DescriptionProps {
  enoughTime: EnoughTime;
  premiumUntil?: Date;
  serviceType: ServiceType;
  status: AccountStatus;
  usdBalance: BigNumber;
}

export const Details = ({
  enoughTime,
  premiumUntil,
  serviceType,
  status,
  usdBalance: _usdBalance,
}: DescriptionProps) => {
  const isPremium = !!premiumUntil;

  const classes = useStyles(isPremium);

  const usdBalance = isPremium
    ? t(`${i18nKeyRoot}.description.premium.text`, { date: premiumUntil })
    : `~$${formatNumber(_usdBalance)}`;

  const description = serviceTypeToDescriptionMap[serviceType]({ enoughTime });
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
