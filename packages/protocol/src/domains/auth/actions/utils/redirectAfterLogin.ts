import { push } from 'connected-react-router';

import { AppDispatch, RootState } from 'store';
import { selectCanContinueTeamCreationFlow } from 'modules/groups/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

import { getLocationToRedirectAfterConnect } from './getLocationToRedirectAfterConnect';

export const redirectAfterLogin = (dispatch: AppDispatch, state: RootState) => {
  const { selectedGroupRole } = selectUserGroupConfigByAddress(state);

  const canContinueTeamCreationFlow = selectCanContinueTeamCreationFlow(state);

  const redirectTo = getLocationToRedirectAfterConnect({
    selectedGroupRole,
    canContinueTeamCreationFlow,
  });

  dispatch(push(redirectTo));
};
