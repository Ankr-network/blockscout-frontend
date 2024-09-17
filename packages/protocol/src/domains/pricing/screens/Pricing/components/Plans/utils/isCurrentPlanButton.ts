import { EChargingModel } from 'modules/payments/types';

import { EGeneralPlanList } from '../PlansUtils';

interface IsCurrentPlanButtonParams {
  isLoggedIn: boolean;
  chargingType: EChargingModel;
  planName: EGeneralPlanList;
}

export const isCurrentPlanButton = ({
  chargingType,
  isLoggedIn,
  planName,
}: IsCurrentPlanButtonParams) => {
  if (isLoggedIn) {
    return (
      (chargingType === EChargingModel.PAYG &&
        planName === EGeneralPlanList.PayAsYouGo) ||
      (chargingType === EChargingModel.Deal &&
        (planName === EGeneralPlanList.Deal ||
          planName === EGeneralPlanList.PayAsYouGo))
    );
  }

  return false;
};
