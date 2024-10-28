import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { GroupUserRole } from 'multirpc-sdk';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import {
  setUserGroupConfig,
  UserGroupConfigWithAddress,
} from 'domains/userGroup/store';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';

export interface UseAcceptTeamInvitationSuccessHandlerParams {
  handleTeamInvitationDialogClose: () => void;
}

const { showNotification } = NotificationActions;

export const useAcceptTeamInvitationSuccessHandler = ({
  handleTeamInvitationDialogClose,
}: UseAcceptTeamInvitationSuccessHandlerParams) => {
  const {
    gname: teamName,
    group: groupAddress,
    role,
  } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const { address } = useAuth();

  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const selectAcceptedTeam = useCallback(() => {
    const acceptedGroupConfig: UserGroupConfigWithAddress = {
      address,
      selectedGroupAddress: groupAddress,
      selectedGroupRole: role,
    };

    dispatch(setUserGroupConfig(acceptedGroupConfig));
  }, [address, dispatch, groupAddress, role]);

  const onSuccess = useCallback(() => {
    const message = t(
      'teams.team-invitation-dialog.successful-joining-message',
      { teamName },
    );

    dispatch(showNotification({ message, severity: 'success' }));

    selectAcceptedTeam();

    handleTeamInvitationDialogClose();

    if (role && role === GroupUserRole.finance) {
      push(AccountRoutesConfig.accountDetails.generatePath());
    } else {
      push(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [
    dispatch,
    handleTeamInvitationDialogClose,
    push,
    role,
    selectAcceptedTeam,
    teamName,
  ]);

  return { onSuccess };
};
