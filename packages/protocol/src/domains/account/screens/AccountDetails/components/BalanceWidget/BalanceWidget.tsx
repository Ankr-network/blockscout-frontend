import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/types';

import { Balance } from './components/Balance';
import { Description } from './components/Description';
import { EditSubscriptionsDialog } from '../EditSubscriptionsDialog';
import { Header } from './components/Header';
import { ScheduledPayments } from '../ScheduledPayments';
import { Widget } from '../Widget';
import { useBalanceWidget } from './hooks/useBalanceWidget';
import { useBalanceWidgetStyles } from './BalanceWidgetStyles';

export interface BalanceWidgetProps {
  className: string;
}

export const BalanceWidget = ({
  className: outerClassName,
}: BalanceWidgetProps) => {
  const {
    creditBalance,
    hasBundleSubscriptions,
    hasDescription,
    hasPAYGLabel,
    hasSubcriptions,
    isEditDialogOpened,
    isUpgradeDialogOpened,
    onEdit,
    onEditDialogClose,
    onTopUp,
    onUpgradeDialogClose,
    status,
    usdBalance,
  } = useBalanceWidget();

  const { classes, cx } = useBalanceWidgetStyles();

  const className = cx(classes.root, outerClassName);

  const contentClassName = cx(classes.content, {
    [classes.withSubscription]: hasBundleSubscriptions,
    [classes.withDescription]: hasDescription,
    [classes.withPAYGLabel]: hasPAYGLabel,
  });

  return (
    <Widget
      className={className}
      contentClassName={contentClassName}
      hasEditButton={hasBundleSubscriptions && hasSubcriptions}
      hasTopUpButton={hasBundleSubscriptions}
      onEdit={onEdit}
      onTopUp={onTopUp}
    >
      <Header className={classes.header} hasPAYGLabel={hasPAYGLabel} />
      <Balance
        className={classes.balance}
        creditBalance={creditBalance}
        status={status}
        usdBalance={usdBalance}
      />
      {hasDescription && <Description className={classes.description} />}
      {hasBundleSubscriptions && <ScheduledPayments />}
      <EditSubscriptionsDialog
        isOpened={isEditDialogOpened}
        onClose={onEditDialogClose}
      />
      <UpgradePlanDialog
        currency={TopUpCurrency.USD}
        defaultState={ContentType.TOP_UP}
        onClose={onUpgradeDialogClose}
        open={isUpgradeDialogOpened}
      />
    </Widget>
  );
};
