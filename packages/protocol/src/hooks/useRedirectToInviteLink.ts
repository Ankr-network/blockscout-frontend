import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { TEAM_INVITE_LINK_KEY } from 'modules/common/constants/const';
import { isTeamInvitationQuery } from 'domains/userSettings/utils/isTeamInvitationQuery';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useRedirectToInviteLink = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const inviteLink = window.localStorage.getItem(TEAM_INVITE_LINK_KEY);

    if (isLoggedIn && inviteLink) {
      const inviteUrl = new URL(inviteLink);

      const isTeamInvitation = isTeamInvitationQuery(inviteUrl.search ?? '');

      if (isTeamInvitation) {
        window.localStorage.removeItem(TEAM_INVITE_LINK_KEY);
        window.location.replace(inviteLink);
      }
    }
  }, [isLoggedIn, history]);
};
