import { GroupInvitation } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';
import { isMutationSuccessful } from 'store/utils/isMutationSuccessful';
import { useInviteTeamMemberMutation } from 'domains/userSettings/actions/teams/inviteTeamMember';
import {
  resetNewUserGroupData,
  resetShouldContinueTeamCreationFlow,
} from 'modules/groups/store/newUserGroupSlice';

export interface UseInviteCallbackParams {
  emails: string[];
  group: string;
  inviteeRole: InviteeRole;
  onSuccess: () => void;
  setErrorMessage: (message: string) => void;
}

const emptyEmailsListErrorMessageKey =
  'teams.invite-teammates-dialog.error-message-empty-emails-list';

export const useInviteCallback = ({
  emails,
  group,
  inviteeRole,
  onSuccess,
  setErrorMessage,
}: UseInviteCallbackParams) => {
  const [invite, { isLoading: isInviting }] = useInviteTeamMemberMutation();

  const dispatch = useDispatch();

  const handleInvite = useCallback(async () => {
    if (emails.length === 0) {
      setErrorMessage(t(emptyEmailsListErrorMessageKey));
    } else {
      const invitations = emails.map<GroupInvitation>(email => ({
        email,
        role: inviteeRole,
      }));

      const result = await invite({ group, invitations });

      if (isMutationSuccessful(result)) {
        onSuccess();
      }

      // after user invites teammates, saved data can be removed
      dispatch(resetShouldContinueTeamCreationFlow());
      dispatch(resetNewUserGroupData());
    }
  }, [
    emails,
    setErrorMessage,
    invite,
    group,
    dispatch,
    inviteeRole,
    onSuccess,
  ]);

  return { handleInvite, isInviting };
};
