import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import {
  IPaymentFormProps,
  PaymentForm,
} from 'modules/billing/components/PaymentForm';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { RecurringPaymentsWidget } from '../RecurringPaymentsWidget';
import { useAccountManagerStyles } from './AccountManagerStyles';

interface IAccountManagerProps extends IPaymentFormProps {}

export const AccountManager = (paymentFormProps: IAccountManagerProps) => {
  const { classes } = useAccountManagerStyles();

  return (
    <div className={classes.root}>
      <ChargingModelWidget className={classes.balance} />
      <GuardUserGroup blockName={BlockWithPermission.Billing}>
        <PaymentForm className={classes.paymentForm} {...paymentFormProps} />
      </GuardUserGroup>
      <RecurringPaymentsWidget className={classes.subscriptions} />
    </div>
  );
};
