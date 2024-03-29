import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

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
import { EChargingModel, IChargingModelData } from 'modules/billing/types';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { Widget } from '../Widget';
import { useBalanceWidget } from './hooks/useBalanceWidget';
import { useChargingModelWidgetStyles } from './ChargingModelWidgetStyles';
import { AssetsBalanceDialog } from './components/AssetsBalanceDialog';
import { ChargingModelWidgetWrapper } from './components/ChargingModelWidgetWrapper';
import { BalanceProgressBar } from './components/BalanceProgressBar';
import { API_CREDITS_BALANCE_FIELD_NAME } from '../../const';
import { useFreemiumChargingModel } from '../../hooks/useFreemiumChargingModel';
import { intlRoot } from './const';

export interface ChargingModelWidgetProps {
  className: string;
}

export const ChargingModelWidget = ({
  className,
}: ChargingModelWidgetProps) => {
  const { isUpgradeDialogOpened, onUpgradeDialogClose } = useBalanceWidget();

  const { isOpened, onClose, onOpen: onOpenBalanceDialog } = useDialog();

  const { classes, cx } = useChargingModelWidgetStyles();

  const chargingModels = useAppSelector(selectAccountChargingModels);

  const currentChargingModel = useAppSelector(selectActiveChargingModel);

  const isMobile = useIsXSDown();

  const { shouldShowFreemium } = useFreemiumChargingModel();

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
          usdBalance={balancesData.balanceUsd}
          balanceInRequests={balancesData.balanceInRequests}
        />
      );
    },
    [classes.balance],
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

  const assetsBtn = useMemo(() => {
    return (
      <Button
        className={classes.assetsBtn}
        variant="outlined"
        onClick={onOpenBalanceDialog}
        disabled={
          currentChargingModel.type === EChargingModel.Free ||
          shouldShowFreemium
        }
      >
        {t(`${intlRoot}.assets-balance-button`)}
      </Button>
    );
  }, [
    classes.assetsBtn,
    currentChargingModel.type,
    onOpenBalanceDialog,
    shouldShowFreemium,
  ]);

  return (
    <>
      <Widget
        className={cx(classes.root, className)}
        contentClassName={classes.content}
        actionsClassName={classes.widgetActions}
      >
        <Header
          className={classes.header}
          currentChargingModelType={currentChargingModel.type}
        >
          {!isMobile && assetsBtn}
        </Header>
        {currentPlanBalance}
        {isMobile && assetsBtn}
      </Widget>

      <UpgradePlanDialog
        currency={TopUpCurrency.USD}
        defaultState={ContentType.TOP_UP}
        onClose={onUpgradeDialogClose}
        open={isUpgradeDialogOpened}
      />

      <AssetsBalanceDialog isOpened={isOpened} onClose={onClose}>
        {chargingModels.map((chargingModel, index) => {
          const balance = renderBalance(chargingModel);

          return (
            <ChargingModelWidgetWrapper
              {...chargingModel}
              key={index}
              isCurrentModel={index === 0}
              balance={balance}
            />
          );
        })}
      </AssetsBalanceDialog>
    </>
  );
};
