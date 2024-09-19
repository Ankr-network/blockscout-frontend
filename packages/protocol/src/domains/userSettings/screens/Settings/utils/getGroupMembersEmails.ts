import { IApiUserGroupDetails } from 'multirpc-sdk';

export interface IGetGroupMemberEmailsParams {
  groupDetails?: IApiUserGroupDetails;
}

export const getGroupMembersEmails = ({
  groupDetails,
}: IGetGroupMemberEmailsParams) => {
  const members = groupDetails?.members || [];
  const invitees = groupDetails?.invitations || [];

  const membersEmails = members.map(member => member.email);
  const inviteesEmails = invitees.map(invitee => invitee.email);

  return [...membersEmails, ...inviteesEmails];
};
