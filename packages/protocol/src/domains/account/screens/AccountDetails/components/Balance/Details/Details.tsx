import React from 'react';
import BigNumber from 'bignumber.js';

import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountStatus } from 'multirpc-sdk';
import { getDescriptions } from './DetailsUtils';

import { useStyles } from './DetailsStyles';

export interface DetailsProps {
  premiumUntil?: Date;
  status: AccountStatus;
  usdBalance: BigNumber;
}

export const Details = ({ premiumUntil, status, usdBalance }: DetailsProps) => {
  const isPremium = !!premiumUntil;

  const classes = useStyles(isPremium);

  const [description, extraDescription] = getDescriptions({
    premiumUntil,
    status,
    usdBalance,
  });

  const descriptions = (
    <>
      {description && (
        <span className={classes.description}>{description}</span>
      )}
      {extraDescription && (
        <span className={classes.extraDescription}>{extraDescription}</span>
      )}
    </>
  );
  const content = isPremium ? (
    <div className={classes.descriptions}>{descriptions}</div>
  ) : (
    descriptions
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
