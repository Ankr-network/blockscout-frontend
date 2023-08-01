import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';

import { AccountDetailsTopUp } from '../AccountDetailsTopUp';
import { BalanceWidget } from '../BalanceWidget';
import { PlanWidget } from '../PlanWidget';
import { SubscriptionsWidget } from '../SubscriptionsWidget';
import { useAccountManagerStyles } from './AccountManagerStyles';

export const AccountManager = () => {
  const { isSubscribed: hasBundleSubscription } = useMyBundles({
    skipFetching: true,
  });

  const { classes, cx } = useAccountManagerStyles();

  const className = cx(classes.root, {
    [classes.withCurrentPlan]: hasBundleSubscription,
  });

  return (
    <div className={className}>
      <BalanceWidget className={classes.balance} />
      {hasBundleSubscription ? (
        <PlanWidget className={classes.currentPlan} />
      ) : (
        <>
          <GuardUserGroup blockName={BlockWithPermission.Billing}>
            <AccountDetailsTopUp className={classes.topUp} />
          </GuardUserGroup>
          <SubscriptionsWidget className={classes.subscriptions} />
        </>
      )}
    </div>
  );
};
