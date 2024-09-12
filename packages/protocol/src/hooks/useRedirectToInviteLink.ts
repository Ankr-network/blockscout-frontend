import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { TEAM_INVITE_LINK_SEARCH_KEY } from 'modules/common/constants/const';
import { isTeamInvitationQuery } from 'domains/userSettings/utils/isTeamInvitationQuery';
import { getTeamInvitationParams } from 'domains/userSettings/utils/getTeamInvitationParams';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

interface IUseRedirectToInviteLinkParams {
  shouldSkipRedirect: boolean;
}

export const useRedirectToInviteLink = ({
  shouldSkipRedirect,
}: IUseRedirectToInviteLinkParams) => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const inviteLinkSearch = window.localStorage.getItem(
      TEAM_INVITE_LINK_SEARCH_KEY,
    );

    if (isLoggedIn && inviteLinkSearch && !shouldSkipRedirect) {
      const isTeamInvitation = isTeamInvitationQuery(inviteLinkSearch ?? '');

      if (isTeamInvitation) {
        window.localStorage.removeItem(TEAM_INVITE_LINK_SEARCH_KEY);

        dispatch(
          push(
            UserSettingsRoutesConfig.teamInvitation.generatePath(
              getTeamInvitationParams(inviteLinkSearch ?? ''),
            ),
          ),
        );
      }
    }
  }, [isLoggedIn, history, shouldSkipRedirect, dispatch]);
};
