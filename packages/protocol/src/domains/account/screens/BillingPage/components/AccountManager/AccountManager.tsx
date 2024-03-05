import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { AccountDetailsTopUp } from '../AccountDetailsTopUp';
import { ChargingModelWidget } from '../ChargingModelWidget';
import { RecurringPaymentsWidget } from '../RecurringPaymentsWidget';
import { useAccountManagerStyles } from './AccountManagerStyles';

export const AccountManager = () => {
  const { classes } = useAccountManagerStyles();

  return (
    <div className={classes.root}>
      <ChargingModelWidget className={classes.balance} />
      <GuardUserGroup blockName={BlockWithPermission.Billing}>
        <AccountDetailsTopUp className={classes.topUp} />
      </GuardUserGroup>
      <RecurringPaymentsWidget className={classes.subscriptions} />
    </div>
  );
};
