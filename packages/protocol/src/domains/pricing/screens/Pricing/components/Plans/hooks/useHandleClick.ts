import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'routes/constants';

import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { PATH_ACCOUNT } from 'domains/account/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { ChainsRoutesConfig } from 'domains/chains/routes';

import { EPlanList } from '../PlansUtils';

interface UseHandleClickArguments {
  isLoggedIn: boolean;
  isFinanceRole: boolean;
  hasPremium: boolean;
  shouldCloseForFree?: boolean;
  onOpenUpgradePlanDialog: () => void;
  onOpenSignupDialog: () => void;
  onOpenTopupDialog: () => void;
  onClose: () => void;
}

export const useHandleClick = ({
  hasPremium,
  isFinanceRole,
  isLoggedIn,
  onClose,
  onOpenSignupDialog,
  onOpenTopupDialog,
  onOpenUpgradePlanDialog,
  shouldCloseForFree = false,
}: UseHandleClickArguments) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return useCallback(
    (planName: string) => {
      const isFreePlanName = planName === EPlanList.Free;
      const isPremiumPlanName = planName === EPlanList.Premium;
      const isEnterprisePlanName = planName === EPlanList.Enterprise;

      if (!isLoggedIn && isPremiumPlanName) {
        onOpenSignupDialog();

        return;
      }

      if (isFreePlanName) {
        if (shouldCloseForFree) {
          onClose();
        }

        const localtion = isLoggedIn
          ? ProjectsRoutesConfig.projects.generatePath()
          : ChainsRoutesConfig.chains.generatePath({ isLoggedIn });

        history.replace(localtion);

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
      shouldCloseForFree,
      onClose,
    ],
  );
};
