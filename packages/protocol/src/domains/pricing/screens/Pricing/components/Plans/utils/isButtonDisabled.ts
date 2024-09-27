import { EGeneralPlanList } from '../PlansUtils';

interface IsButtonDisabledArguments {
  hasPremium: boolean;
  isLoggedIn: boolean;
  planName: EGeneralPlanList;
}

export const isButtonDisabled = ({
  hasPremium,
  isLoggedIn,
  planName,
}: IsButtonDisabledArguments) => {
  if (!isLoggedIn) return false;

  const isFreePlanName = planName === EGeneralPlanList.Free;

  return isFreePlanName && hasPremium;
};
