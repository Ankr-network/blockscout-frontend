import { EPlanList } from '../PlansUtils';

interface IsButtonDisabledArguments {
  isFinanceRole: boolean;
  hasPremium: boolean;
  planName: EPlanList;
}

export const isButtonDisabled = ({
  hasPremium,
  isFinanceRole,
  planName,
}: IsButtonDisabledArguments) => {
  const isFreePlanName = planName === EPlanList.Free;

  return isFreePlanName && (isFinanceRole || hasPremium);
};
