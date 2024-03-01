import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { ConfirmCancellationDialog } from 'modules/billing/components/PeriodicPayments/components/ConfirmCancellationDialog/ConfirmCancellationDialog';
import { useConfirmCancelDialog } from 'modules/billing/components/PeriodicPayments/components/ConfirmCancellationDialog/hooks/useConfirmCancelDialog';

import { AccountDetailsTopUp } from '../AccountDetailsTopUp';
import { ChargingModelWidget } from '../ChargingModelWidget';
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

  const switchCurrentChargingModel = () => {
    // TODO: add handler
  };

  const {
    isOpened,
    onClose,
    dialogTitle,
    dialogDescription,
    handleConfirm,
    isLoading,
  } = useConfirmCancelDialog(true);

  return (
    <div className={className}>
      <ChargingModelWidget
        className={classes.balance}
        onSwitchChargingModel={switchCurrentChargingModel}
      />
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

      <ConfirmCancellationDialog
        title={dialogTitle}
        description={dialogDescription}
        isOpened={isOpened}
        onClose={onClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </div>
  );
};
