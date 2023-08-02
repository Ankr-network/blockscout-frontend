import { useCallback } from 'react';

import { PLAN_LIST } from '../PlansUtils';

interface IsButtonDisabledArguments {
  isFinanceRole: boolean;
  hasPremium: boolean;
}

export const useIsButtonDisabled = ({
  isFinanceRole,
  hasPremium,
}: IsButtonDisabledArguments) => {
  return useCallback(
    (planName: string) => {
      const isFreePlanName = planName === PLAN_LIST[0];

      return isFreePlanName && (isFinanceRole || hasPremium);
    },
    [hasPremium, isFinanceRole],
  );
};
