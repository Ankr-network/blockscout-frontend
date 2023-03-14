import BigNumber from 'bignumber.js';

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
      {extraDescription && (
        <span className={classes.extraDescription}>{extraDescription}</span>
      )}
    </>
  );

  const content = hasPremium ? (
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
