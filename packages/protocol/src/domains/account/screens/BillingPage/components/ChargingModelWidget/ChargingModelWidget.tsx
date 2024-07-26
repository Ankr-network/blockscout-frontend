import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { EChargingModel } from 'modules/payments/types';
import {
  selectAccountChargingModels,
  selectActiveChargingModel,
} from 'domains/account/store/selectors';
import {
  selectHasPromoBundle,
  selectPromoChargingModel,
} from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { AssetsBalanceDialog } from './components/AssetsBalanceDialog';
import { Balance } from './components/Balance';
import { ChargingModelBalance } from './components/ChargingModelBalance';
import { ChargingModelWidgetWrapper } from './components/ChargingModelWidgetWrapper';
import { Header } from './components/Header';
import { PromoBalance } from './components/PromoBalance';
import { Widget } from '../Widget';
import { intlRoot } from './const';
import { renderBalance } from './utils/renderBalance';
import { useBalanceWidget } from './hooks/useBalanceWidget';
import { useChargingModelWidgetStyles } from './ChargingModelWidgetStyles';
import { useFreemiumChargingModel } from '../../hooks/useFreemiumChargingModel';

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

  const { shouldShowFreemium } = useFreemiumChargingModel(currentChargingModel);

  const hasPromoBundle = useAppSelector(selectHasPromoBundle);
  const promoChargingModel = useAppSelector(selectPromoChargingModel);

  const assetsButton = (
    <Button
      className={classes.assetsBtn}
      variant="outlined"
      onClick={onOpenBalanceDialog}
      disabled={
        currentChargingModel.type === EChargingModel.Free || shouldShowFreemium
      }
    >
      {t(`${intlRoot}.assets-balance-button`)}
    </Button>
  );

  console.log({ promoChargingModel });

  const balanceElement = hasPromoBundle ? (
    <PromoBalance />
  ) : (
    <ChargingModelBalance className={classes.balance} />
  );

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
          currentChargingModel={currentChargingModel}
        >
          {!isMobile && assetsButton}
        </Header>
        {balanceElement}
        {isMobile && assetsButton}
      </Widget>
      <UpgradePlanDialog
        defaultState={ContentType.TOP_UP}
        onClose={onUpgradeDialogClose}
        open={isUpgradeDialogOpened}
      />
      <AssetsBalanceDialog isOpened={isOpened} onClose={onClose}>
        {hasPromoBundle && promoChargingModel && (
          <ChargingModelWidgetWrapper
            {...promoChargingModel}
            balance={
              <Balance
                balanceInRequests={promoChargingModel.balance.balanceInRequests}
                className={classes.balance}
                creditBalance={promoChargingModel.balance.balanceApiCredits}
                hasUsdBalance={false}
                isRequestsBalanceApproximate={false}
                shouldUseRequests={false}
                usdBalance={0}
              />
            }
            isCurrentModel
            isPromo
          />
        )}
        {chargingModels.map((chargingModel, index) => {
          const balance = renderBalance({
            chargingModel,
            className: classes.balance,
          });

          return (
            <ChargingModelWidgetWrapper
              {...chargingModel}
              key={index}
              isCurrentModel={index === 0 && !hasPromoBundle}
              balance={balance}
            />
          );
        })}
      </AssetsBalanceDialog>
    </>
  );
};
