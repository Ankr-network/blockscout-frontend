import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'routes/constants';

import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { PATH_ACCOUNT } from 'domains/account/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

import { EPlanList } from '../PlansUtils';

interface UseHandleClickArguments {
  isLoggedIn: boolean;
  isFinanceRole: boolean;
  hasPremium: boolean;
  onOpenSignupDialog: () => void;
  onOpenTopupDialog: () => void;
}

export const useHandleClick = ({
  hasPremium,
  isFinanceRole,
  isLoggedIn,
  onOpenSignupDialog,
  onOpenTopupDialog,
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
        const localtion = isLoggedIn
          ? ProjectsRoutesConfig.projects.generatePath()
          : ChainsRoutesConfig.chains.generatePath({ isLoggedIn });

        history.replace(localtion);

        return;
      }

      if (isEnterprisePlanName) {
        window.open(SALES_TEAM_CONTACT, '_blank');

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
      onOpenSignupDialog,
      onOpenTopupDialog,
      dispatch,
    ],
  );
};
