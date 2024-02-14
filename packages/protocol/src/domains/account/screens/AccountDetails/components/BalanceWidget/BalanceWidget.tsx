import { useMemo } from 'react';

import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/types';
import { EChargingModel } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';

import { Balance } from './components/Balance';
import { Description } from './components/Description';
import { EditSubscriptionsDialog } from '../EditSubscriptionsDialog';
import { Header } from './components/Header';
import { ScheduledPayments } from '../ScheduledPayments';
import { Widget } from '../Widget';
import { useBalanceWidget } from './hooks/useBalanceWidget';
import { useBalanceWidgetStyles } from './BalanceWidgetStyles';
import { AssetsBalanceDialog } from './components/AssetsBalanceDialog';
import { ChargingModelWidgetWrapper } from './components/ChargingModelWidgetWrapper';

export interface BalanceWidgetProps {
  className: string;
  onSwitchChargingModel: () => void;
}

export const BalanceWidget = ({
  className: outerClassName,
  onSwitchChargingModel,
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

  const { isOpened, onClose, onOpen: onOpenBalanceDialog } = useDialog();

  const { classes, cx } = useBalanceWidgetStyles();

  const className = cx(classes.root, outerClassName);

  const contentClassName = cx(classes.content, {
    [classes.withSubscription]: hasBundleSubscriptions,
    [classes.withDescription]: hasDescription,
    [classes.withPAYGLabel]: hasPAYGLabel,
  });

  const currentBalance = useMemo(
    () => (
      <Balance
        className={classes.balance}
        creditBalance={creditBalance}
        status={status}
        usdBalance={usdBalance}
      />
    ),
    [classes.balance, creditBalance, status, usdBalance],
  );

  return (
    <>
      <Widget
        className={className}
        contentClassName={contentClassName}
        hasEditButton={hasBundleSubscriptions && hasSubcriptions}
        hasTopUpButton={hasBundleSubscriptions}
        onEdit={onEdit}
        onTopUp={onTopUp}
      >
        <Header
          className={classes.header}
          hasPAYGLabel={hasPAYGLabel}
          isFree={!hasPAYGLabel}
          onOpenBalanceDialog={onOpenBalanceDialog}
        />
        {currentBalance}
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

      <AssetsBalanceDialog isOpened={isOpened} onClose={onClose}>
        <ChargingModelWidgetWrapper
          isCurrentModel
          chargingModel={EChargingModel.PAYG}
          balance={currentBalance}
        />
        <ChargingModelWidgetWrapper
          chargingModel={EChargingModel.Package}
          balance={currentBalance} // TODO: balance according to package
          progressLabel="15M from 15M used (100%)" // TODO: get data from API
          progressValue={100} // TODO: get data from API
          onSwitchChargingModel={onSwitchChargingModel} // TODO: add handler
          isExpired
        />
        <ChargingModelWidgetWrapper
          chargingModel={EChargingModel.Deal}
          balance={currentBalance} // TODO: balance according to package
          progressLabel="6B from 6B used (100%)" // TODO: get data from API
          maxLabel="Expires: Dec 30, 2023" // TODO: get data from API
          progressValue={40} // TODO: get data from API
        />
      </AssetsBalanceDialog>
    </>
  );
};
