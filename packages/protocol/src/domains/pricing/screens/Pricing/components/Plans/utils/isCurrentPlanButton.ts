import { EPlanList } from '../PlansUtils';

interface IsCurrentPlanButtonParams {
  isFinanceRole: boolean;
  isLoggedIn: boolean;
  hasPremium: boolean;
  planName: EPlanList;
}

export const isCurrentPlanButton = ({
  hasPremium,
  isFinanceRole,
  isLoggedIn,
  planName,
}: IsCurrentPlanButtonParams) => {
  if (isLoggedIn && !isFinanceRole) {
    return (
      (hasPremium && planName === EPlanList.Premium) ||
      (!hasPremium && planName === EPlanList.Free)
    );
  }

  return false;
};
