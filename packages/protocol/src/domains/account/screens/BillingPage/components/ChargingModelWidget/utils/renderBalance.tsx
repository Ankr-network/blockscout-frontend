import { EChargingModel, IChargingModelData } from 'modules/payments/types';

import { API_CREDITS_BALANCE_FIELD_NAME } from '../../../const';
import { Balance } from '../components/Balance';

export interface IRenderBalanceParams {
  chargingModel: IChargingModelData;
  className: string;
}

export const renderBalance = ({
  chargingModel,
  className,
}: IRenderBalanceParams) => {
  const { balance: balancesData, type } = chargingModel;

  const isPackage = type === EChargingModel.Package;
  const creditBalance =
    API_CREDITS_BALANCE_FIELD_NAME in balancesData
      ? balancesData.balanceApiCredits
      : undefined;

  return (
    <Balance
      balanceInRequests={balancesData.balanceInRequests}
      className={className}
      creditBalance={creditBalance}
      shouldUseRequests={isPackage}
      usdBalance={balancesData.balanceUsd}
    />
  );
};
