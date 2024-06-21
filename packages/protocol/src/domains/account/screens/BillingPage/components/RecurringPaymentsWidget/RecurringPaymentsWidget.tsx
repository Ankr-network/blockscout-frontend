import { RecurrentInterval } from 'multirpc-sdk';

import { DealRenewalCancelDialog } from 'modules/billing/components/PeriodicPayments/components/DealRenewalCancelDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

import { EditSubscriptionsDialog } from '../EditSubscriptionsDialog';
import { Header } from './components/Header';
import { Price } from '../Price';
import { ScheduledPayments } from '../ScheduledPayments';
import { Widget } from '../Widget';
import { useRecurringPaymentsWidget } from './hooks/useRecurringPaymentsWidget';
import { useRecurringPaymentsWidgetStyles } from './useRecurringPaymentsWidgetStyles';
import { useEditSubscriptionsDialog } from '../EditSubscriptionsDialog/hooks/useEditSubscriptionsDialog';

export interface RecurringPaymentsWidgetProps {
  className?: string;
}

export const RecurringPaymentsWidget = ({
  className,
}: RecurringPaymentsWidgetProps) => {
  const {
    amount,
    isEditDialogOpened,
    isSubscribed,
    onEdit,
    onEditDialogClose,
  } = useRecurringPaymentsWidget();

  const {
    isOpened: isOpenedSuccessDialog,
    onClose: onCloseSuccessDialog,
    onOpen: onOpenSuccessDialog,
  } = useDialog();

  const { classes, cx } = useRecurringPaymentsWidgetStyles();

  const {
    expirationDate,
    isDealCancelled,
    isPackageCancelled,
    onCancelSubscription,
    recurringPayments,
  } = useEditSubscriptionsDialog(onEditDialogClose);

  return (
    <>
      <Widget
        className={cx(classes.root, className)}
        hasEditButton={isSubscribed}
        onEdit={onEdit}
      >
        <Header />
        <Price
          amount={amount}
          className={classes.price}
          period={RecurrentInterval.MONTH}
        />
        <ScheduledPayments />
      </Widget>

      <EditSubscriptionsDialog
        isOpened={isEditDialogOpened}
        onClose={onEditDialogClose}
        onOpenSuccessDialog={onOpenSuccessDialog}
        onCancelSubscription={onCancelSubscription}
        recurringPayments={recurringPayments}
      />

      <DealRenewalCancelDialog
        expiresAt={expirationDate}
        isDeal={isDealCancelled}
        isOpened={isOpenedSuccessDialog}
        isPackage={isPackageCancelled}
        onClose={onCloseSuccessDialog}
      />
    </>
  );
};
