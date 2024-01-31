import { UserGroup } from 'multirpc-sdk';
import { useCallback, useEffect } from 'react';

import { CreateTeamSuccessDialog } from 'modules/groups/components/CreateTeamSuccessDialog';
import { InviteTeammatesDialog } from 'modules/groups/components/InviteTeammatesDialog';
import { useCreateTeamForm } from 'modules/groups/components/CreateTeamForm/hooks/useCreateTeamForm';
import { selectNewUserGroupResponse } from 'modules/groups/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import {
  resetNewUserGroupData,
  resetShouldContinueTeamCreationFlow,
} from 'modules/groups/store/newUserGroupSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useContinueTeamCreationFlow } from 'modules/groups/hooks/useContinueTeamCreationFlow';

import { useTeamsListStyles } from './useTeamsListStyles';
import { UserGroupItem } from '../UserGroupItem';

interface TeamsListProps {
  userGroups: UserGroup[];
}

export const TeamsList = ({ userGroups }: TeamsListProps) => {
  const { classes } = useTeamsListStyles();

  const newGroupData = useAppSelector(selectNewUserGroupResponse);

  const {
    handleCloseInviteTeamDialog,
    handleOpenInviteTeammatesDialog,
    invitedEmails,
    isOpenedInviteTeammatesDialog,
    isOpenedSuccessDialog,
    onCloseSuccessDialog,
    onOpenSuccessDialog,
  } = useCreateTeamForm({ teamName: newGroupData?.group.name });

  const { canContinueTeamCreationFlow } = useContinueTeamCreationFlow();

  useEffect(() => {
    if (canContinueTeamCreationFlow) {
      onOpenSuccessDialog();
    }
  }, [canContinueTeamCreationFlow, onOpenSuccessDialog]);

  const dispatch = useAppDispatch();

  const handleCloseSuccessDialog = useCallback(() => {
    // after user sign up, we should clear storage for new team with data transfer
    dispatch(resetShouldContinueTeamCreationFlow());
    dispatch(resetNewUserGroupData());

    onCloseSuccessDialog();
  }, [dispatch, onCloseSuccessDialog]);

  return (
    <>
      <div className={classes.userGroupsList}>
        {userGroups.map(group => (
          <UserGroupItem key={group.address} group={group} />
        ))}
      </div>

      <CreateTeamSuccessDialog
        isOpened={isOpenedSuccessDialog}
        onClose={handleCloseSuccessDialog}
        onContinueFlow={handleOpenInviteTeammatesDialog}
      />

      {newGroupData?.group && (
        <InviteTeammatesDialog
          group={newGroupData?.group?.address}
          invitedEmails={invitedEmails}
          onClose={handleCloseInviteTeamDialog}
          open={isOpenedInviteTeammatesDialog}
          teamMembersCount={newGroupData?.group?.member_cnt}
          teamMembersLimit={newGroupData?.group?.members_limit}
        />
      )}
    </>
  );
};
