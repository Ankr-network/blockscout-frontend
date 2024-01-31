import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export interface UseRejectTeamInvitationSuccessHandlerParams {
  handleTeamInvitationDialogClose: () => void;
}

const { showNotification } = NotificationActions;

export const useRejectTeamInvitationSuccessHandler = ({
  handleTeamInvitationDialogClose,
}: UseRejectTeamInvitationSuccessHandlerParams) => {
  const { push } = useHistory();

  const dispatch = useDispatch();
  const { gname: teamName } =
    UserSettingsRoutesConfig.teamInvitation.useQuery();

  const onSuccess = useCallback(() => {
    handleTeamInvitationDialogClose();

    push(ProjectsRoutesConfig.projects.generatePath());

    const message = t(
      'teams.team-invitation-dialog.successful-declining-message',
      { teamName },
    );

    dispatch(showNotification({ message, severity: 'success' }));
  }, [dispatch, handleTeamInvitationDialogClose, push, teamName]);

  return { onSuccess };
};
