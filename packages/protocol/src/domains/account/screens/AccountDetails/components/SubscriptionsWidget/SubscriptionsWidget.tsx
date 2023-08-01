import { RecurrentInterval } from 'multirpc-sdk';

import { EditSubscriptionsDialog } from '../EditSubscriptionsDialog';
import { Header } from './components/Header';
import { Price } from '../Price';
import { ScheduledPayments } from '../ScheduledPayments';
import { Widget } from '../Widget';
import { useSubscriptionsWidget } from './hooks/useSubscriptionsWidget';
import { useSubscriptionsWidgetStyles } from './useSubscriptionsWidgetStyles';

export interface SubscriptionsWidgetProps {
  className?: string;
}

export const SubscriptionsWidget = ({
  className,
}: SubscriptionsWidgetProps) => {
  const {
    amount,
    isEditDialogOpened,
    onEditDialogClose,
    onEdit,
    isSubscribed,
  } = useSubscriptionsWidget();

  const { classes, cx } = useSubscriptionsWidgetStyles();

  return (
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
      <EditSubscriptionsDialog
        isOpened={isEditDialogOpened}
        onClose={onEditDialogClose}
      />
    </Widget>
  );
};
