import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'routes/constants';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { PATH_ACCOUNT } from 'domains/account/Routes';

import { PLAN_LIST } from '../PlansUtils';

interface UseHandleClickArguments {
  isLoggedIn: boolean;
  isFinanceRole: boolean;
  hasPremium: boolean;
  onOpenUpgradePlanDialog: () => void;
  onOpenSignupDialog: () => void;
  onOpenTopupDialog: () => void;
}

export const useHandleClick = ({
  isLoggedIn,
  isFinanceRole,
  hasPremium,
  onOpenUpgradePlanDialog,
  onOpenSignupDialog,
  onOpenTopupDialog,
}: UseHandleClickArguments) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return useCallback(
    (planName: string) => {
      const isFreePlanName = planName === PLAN_LIST[0];
      const isPremiumPlanName = planName === PLAN_LIST[1];
      const isEnterprisePlanName = planName === PLAN_LIST[2];

      if (!isLoggedIn && isPremiumPlanName) {
        onOpenSignupDialog();

        return;
      }

      if (isFreePlanName) {
        history.replace(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));

        return;
      }

      if (isEnterprisePlanName) {
        onOpenUpgradePlanDialog();

        return;
      }

      if (isFinanceRole) {
        history.replace(PATH_ACCOUNT);

        return;
      }

      if (hasPremium) {
        history.replace(INDEX_PATH);

        return;
      }

      dispatch(setTopUpOrigin(TopUpOrigin.PRICING));
      onOpenTopupDialog();
    },
    [
      isFinanceRole,
      isLoggedIn,
      hasPremium,
      history,
      onOpenUpgradePlanDialog,
      onOpenSignupDialog,
      onOpenTopupDialog,
      dispatch,
    ],
  );
};
