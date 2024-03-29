import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';

import { useCreateTeamMutation } from 'domains/userSettings/actions/teams/createTeam';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  setNewUserGroupData,
  setShouldContinueTeamCreationFlow,
} from 'modules/groups/store/newUserGroupSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ESettingsContentType } from 'domains/userSettings/types';
import { isMutationSuccessful } from 'store/utils/isMutationSuccessful';

interface UseCreateTeamFlowParams {
  onOpenDataTransferDialog: () => void;
  teamNameValue: string;
  isDataTransferEnabled: boolean;
}

export const useCreateTeamFlow = ({
  onOpenDataTransferDialog,
  teamNameValue,
  isDataTransferEnabled,
}: UseCreateTeamFlowParams) => {
  const { handleSignOut } = useAuth();
  const { push } = useHistory();

  const [createTeam, { data, isLoading: isCreateTeamLoading }] =
    useCreateTeamMutation();

  const createdGroupDetails = data?.group;

  const dispatch = useDispatch();

  const handleCreateTeamRequest = useCallback(async () => {
    const response = await createTeam({
      name: teamNameValue,
      transfer_assets: isDataTransferEnabled,
    });

    if (isMutationSuccessful(response)) {
      dispatch(setNewUserGroupData(response.data));
      dispatch(setShouldContinueTeamCreationFlow(true));

      dispatch(
        NotificationActions.showNotification({
          message: t('teams.create-team-success-dialog.title'),
          severity: 'success',
          autoHideDuration: null,
        }),
      );

      // if user successfully created a team with data transfer, we should propose him a reLogin path
      // because token is no longer valid after data transfer.
      if (isDataTransferEnabled || response.data.asset_transfer_done) {
        handleSignOut();
      } else {
        push(
          UserSettingsRoutesConfig.settings.generatePath(
            ESettingsContentType.Teams,
          ),
        );
      }
    }
  }, [
    createTeam,
    teamNameValue,
    isDataTransferEnabled,
    dispatch,
    handleSignOut,
    push,
  ]);

  const handleCreateTeamFlow = useCallback(async () => {
    if (isDataTransferEnabled) {
      return onOpenDataTransferDialog();
    }

    return handleCreateTeamRequest();
  }, [
    handleCreateTeamRequest,
    isDataTransferEnabled,
    onOpenDataTransferDialog,
  ]);

  return {
    createdGroupDetails,
    handleCreateTeamFlow,
    handleCreateTeamRequest,
    isCreateTeamLoading,
  };
};
