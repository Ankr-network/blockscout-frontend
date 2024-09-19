import { EGeneralPlanList } from '../PlansUtils';

interface IsButtonDisabledArguments {
  hasPremium: boolean;
  isLoggedIn: boolean;
  isDeveloperRole: boolean;
  planName: EGeneralPlanList;
}

export const isButtonDisabled = ({
  hasPremium,
  isDeveloperRole,
  isLoggedIn,
  planName,
}: IsButtonDisabledArguments) => {
  if (!isLoggedIn) return false;

  const isFreePlanName = planName === EGeneralPlanList.Free;

  if (isDeveloperRole && !isFreePlanName) return true;

  return isFreePlanName && hasPremium;
};
