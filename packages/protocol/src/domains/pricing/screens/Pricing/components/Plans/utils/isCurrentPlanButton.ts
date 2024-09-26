import { EChargingModel } from 'modules/payments/types';

import { EGeneralPlanList } from '../PlansUtils';

interface IsCurrentPlanButtonParams {
  isDeveloperRole: boolean;
  isLoggedIn: boolean;
  chargingType: EChargingModel;
  planName: EGeneralPlanList;
}

export const isCurrentPlanButton = ({
  chargingType,
  isDeveloperRole,
  isLoggedIn,
  planName,
}: IsCurrentPlanButtonParams) => {
  if (isLoggedIn) {
    if (isDeveloperRole) return false;

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
