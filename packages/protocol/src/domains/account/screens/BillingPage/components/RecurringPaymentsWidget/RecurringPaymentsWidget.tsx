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

export interface RecurringPaymentsWidgetProps {
  className?: string;
}

export const RecurringPaymentsWidget = ({
  className,
}: RecurringPaymentsWidgetProps) => {
  const {
    amount,
    isEditDialogOpened,
    onEditDialogClose,
    onEdit,
    isSubscribed,
  } = useRecurringPaymentsWidget();

  const {
    isOpened: isOpenedSuccessDialog,
    onOpen: onOpenSuccessDialog,
    onClose: onCloseSuccessDialog,
  } = useDialog();

  const { classes, cx } = useRecurringPaymentsWidgetStyles();

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
      />

      <DealRenewalCancelDialog
        isOpened={isOpenedSuccessDialog}
        onClose={onCloseSuccessDialog}
        // expiresAt={editorProps.nextBillingDate}
        expiresAt="123123123123123" // TODO
      />
    </>
  );
};
