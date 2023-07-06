import BigNumber from 'bignumber.js';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountType, BalanceStatus } from 'domains/account/types';
import { getDescriptions } from './utils/getDescriptions';

import { useStyles } from './DetailsStyles';

export interface DetailsProps {
  accountType: AccountType;
  premiumUntil?: Date;
  status: BalanceStatus;
  usdBalance: BigNumber;
  creditBalance: BigNumber;
}

export const Details = ({
  accountType,
  premiumUntil,
  status,
  usdBalance,
  creditBalance,
}: DetailsProps) => {
  const hasPremium = !!premiumUntil;

  const { classes } = useStyles();

  const [description, extraDescription] = getDescriptions({
    accountType,
    premiumUntil,
    usdBalance,
    creditBalance,
  });

  const descriptions = (
    <>
      {description && (
        <span className={classes.description}>{description}</span>
      )}
      <GuardUserGroup blockName={BlockWithPermission.AccountStatus}>
        {extraDescription && (
          <span className={classes.extraDescription}>{extraDescription}</span>
        )}
      </GuardUserGroup>
    </>
  );

  const content = hasPremium ? (
    <div className={classes.descriptions}>{descriptions}</div>
  ) : (
    descriptions
  );

  return (
    <div className={classes.detailsRoot}>
      <GuardUserGroup blockName={BlockWithPermission.AccountStatus}>
        <div className={classes.marker}>
          <AccountMarker status={status} />
        </div>
      </GuardUserGroup>
      {content}
    </div>
  );
};
