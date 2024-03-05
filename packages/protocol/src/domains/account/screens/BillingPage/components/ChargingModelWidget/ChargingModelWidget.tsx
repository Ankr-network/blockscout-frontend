import { useCallback, useMemo } from 'react';

import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectAccountChargingModels,
  selectActiveChargingModel,
} from 'domains/account/store/selectors';
import { IChargingModelData } from 'modules/billing/types';

import { Balance } from './components/Balance';
import { Description } from './components/Description';
import { Header } from './components/Header';
import { Widget } from '../Widget';
import { useBalanceWidget } from './hooks/useBalanceWidget';
import { useChargingModelWidgetStyles } from './ChargingModelWidgetStyles';
import { AssetsBalanceDialog } from './components/AssetsBalanceDialog';
import { ChargingModelWidgetWrapper } from './components/ChargingModelWidgetWrapper';
import { BalanceProgressBar } from './components/BalanceProgressBar';
import { API_CREDITS_BALANCE_FIELD_NAME } from '../../const';

export interface ChargingModelWidgetProps {
  className: string;
}

export const ChargingModelWidget = ({
  className: outerClassName,
}: ChargingModelWidgetProps) => {
  const {
    hasDescription,
    hasPAYGLabel,
    isUpgradeDialogOpened,
    onUpgradeDialogClose,
    status,
  } = useBalanceWidget();

  const { isOpened, onClose, onOpen: onOpenBalanceDialog } = useDialog();

  const { classes, cx } = useChargingModelWidgetStyles();

  const className = cx(classes.root, outerClassName);

  const contentClassName = cx(classes.content, {
    [classes.withDescription]: hasDescription,
    [classes.withPAYGLabel]: hasPAYGLabel,
  });

  const chargingModels = useAppSelector(selectAccountChargingModels);

  const currentChargingModel = useAppSelector(selectActiveChargingModel);

  const renderBalance = useCallback(
    (chargingModel: IChargingModelData) => {
      const { balance: balancesData } = chargingModel;

      return (
        <Balance
          className={classes.balance}
          creditBalance={
            API_CREDITS_BALANCE_FIELD_NAME in balancesData
              ? balancesData.balanceApiCredits
              : undefined
          }
          status={status}
          usdBalance={balancesData.balanceUsd}
          balanceInRequests={balancesData.balanceInRequests}
        />
      );
    },
    [classes.balance, status],
  );

  const currentPlanBalance = useMemo(() => {
    const { type } = currentChargingModel;

    return (
      <>
        {renderBalance(currentChargingModel)}
        <div className={classes.balanceProgressBar}>
          <BalanceProgressBar
            isNoticeHidden
            chargingModel={type}
            {...currentChargingModel}
          />
        </div>
      </>
    );
  }, [classes.balanceProgressBar, currentChargingModel, renderBalance]);

  return (
    <>
      <Widget
        className={className}
        contentClassName={contentClassName}
        actionsClassName={classes.widgetActions}
      >
        <Header
          className={classes.header}
          currentChargingModelType={currentChargingModel.type}
          onOpenBalanceDialog={onOpenBalanceDialog}
        />
        {currentPlanBalance}
        {hasDescription && <Description className={classes.description} />}
        <UpgradePlanDialog
          currency={TopUpCurrency.USD}
          defaultState={ContentType.TOP_UP}
          onClose={onUpgradeDialogClose}
          open={isUpgradeDialogOpened}
        />
      </Widget>

      <AssetsBalanceDialog isOpened={isOpened} onClose={onClose}>
        {chargingModels.map((chargingModel, index) => {
          const { type } = chargingModel;

          const balance = renderBalance(chargingModel);

          return (
            <ChargingModelWidgetWrapper
              key={index}
              chargingModel={type}
              isCurrentModel={index === 0}
              {...chargingModel}
              balance={balance}
            />
          );
        })}
      </AssetsBalanceDialog>
    </>
  );
};
