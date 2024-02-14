import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export interface UseRejectGuestTeamInvitationSuccessHandlerParams {
  handleGuestTeamInvitationDialogClose: () => void;
}

const { showNotification } = NotificationActions;

export const useRejectGuestTeamInvitationSuccessHandler = ({
  handleGuestTeamInvitationDialogClose,
}: UseRejectGuestTeamInvitationSuccessHandlerParams) => {
  const { push } = useHistory();

  const dispatch = useDispatch();
  const { gname: teamName } =
    UserSettingsRoutesConfig.teamInvitation.useQuery();

  const onSuccess = useCallback(() => {
    handleGuestTeamInvitationDialogClose();

    push(ChainsRoutesConfig.chains.generatePath({ isLoggedIn: false }));

    const message = t(
      'teams.team-invitation-dialog.successful-declining-message',
      { teamName },
    );

    dispatch(showNotification({ message, severity: 'success' }));
  }, [dispatch, handleGuestTeamInvitationDialogClose, push, teamName]);

  return { onSuccess };
};
