import BigNumber from 'bignumber.js';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountType, BalanceStatus } from 'domains/account/types';
import { getDescriptions } from './utils/getDescriptions';
import { parseDays } from './utils/parseDays';

import { useStyles } from './DetailsStyles';

export interface DetailsProps {
  accountType: AccountType;
  balanceEndTime: number;
  premiumUntil?: Date;
  status: BalanceStatus;
  usdBalance: BigNumber;
}

export const Details = ({
  accountType,
  balanceEndTime,
  premiumUntil,
  status,
  usdBalance,
}: DetailsProps) => {
  const hasPremium = !!premiumUntil;

  const { classes } = useStyles();

  const [description, extraDescription] = getDescriptions({
    accountType,
    endTime: parseDays(balanceEndTime),
    premiumUntil,
    usdBalance,
  });

  const descriptions = (
    <>
      {description && (
        <span className={classes.description}>{description}</span>
      )}
      <GuardUserGroup blockName={BlockWithPermission.Status}>
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
      <GuardUserGroup blockName={BlockWithPermission.Status}>
        <div className={classes.marker}>
          <AccountMarker status={status} />
        </div>
      </GuardUserGroup>
      {content}
    </div>
  );
};
