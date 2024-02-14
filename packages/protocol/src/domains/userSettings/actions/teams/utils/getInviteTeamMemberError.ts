import { CustomErrorCode } from 'errors/const';
import { InviteGroupMemeberResult } from 'multirpc-sdk';

import { InviteTeamMemberError } from 'modules/groups/errors/InviteTeamMemberError';

const messageKey =
  'teams.invite-teammates-dialog.error-message-already-declined-invitation';

export const getInviteTeamMemberError = (data: InviteGroupMemeberResult) => {
  const unsuccessfulInvitations = data.invitations.filter(
    invitation => !invitation.success,
  );
  const hasUnsuccessfulInvitations = unsuccessfulInvitations.length > 0;

  if (hasUnsuccessfulInvitations) {
    const failedEmails = unsuccessfulInvitations.map(
      invitation => invitation.email,
    );

    const inviteTeamMemberError: InviteTeamMemberError = {
      code: CustomErrorCode.InviteTeamMemberError,
      data: failedEmails,
      message: messageKey,
      name: CustomErrorCode.InviteTeamMemberError,
    };

    return inviteTeamMemberError;
  }

  return undefined;
};
