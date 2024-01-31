import { IApiUserGroupDetails, UserGroup } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { DEFAULT_GROUP_MEMBERS_LIMIT } from 'domains/userSettings/screens/Settings/constants';
import {
  InviteTeammatesDialogProps,
  useInviteTeammatesDialog as useInviteTeammatesDialogBase,
} from 'modules/groups/components/InviteTeammatesDialog';
import { getGroupMembersEmails } from 'domains/userSettings/screens/Settings/utils/getGroupMembersEmails';

export interface IUseInviteTeammatesDialogProps {
  group: UserGroup;
  groupDetails?: IApiUserGroupDetails;
  handleFetchGroupDetails: () => Promise<void>;
  isGroupDetailsFetching: boolean;
  isUserGroupExpanding: boolean;
}

export const useInviteTeammatesDialog = ({
  group,
  groupDetails,
  handleFetchGroupDetails,
  isGroupDetailsFetching,
  isUserGroupExpanding,
}: IUseInviteTeammatesDialogProps) => {
  const {
    address: groupAddress,
    membersLimit: groupMembersLimit = DEFAULT_GROUP_MEMBERS_LIMIT,
  } = group;

  const groupMembersEmails = useMemo(
    () => getGroupMembersEmails({ groupDetails }),
    [groupDetails],
  );

  const groupMembersCount = groupMembersEmails.length;

  const isInviteTeammatesDialogLoading =
    isGroupDetailsFetching && !isUserGroupExpanding;

  const {
    handleInviteTeammatesDialogOpen: handleOpen,
    inviteTeammatesDialogProps: mainProps,
  } = useInviteTeammatesDialogBase();

  const handleInviteTeammatesDialogOpen = useCallback(
    async event => {
      event.stopPropagation();

      await handleFetchGroupDetails();

      handleOpen();
    },
    [handleFetchGroupDetails, handleOpen],
  );

  const inviteTeammatesDialogProps = useMemo<InviteTeammatesDialogProps>(
    () => ({
      ...mainProps,
      group: groupAddress,
      invitedEmails: groupMembersEmails,
      teamMembersCount: groupMembersCount,
      teamMembersLimit: groupMembersLimit,
    }),
    [
      groupAddress,
      groupMembersCount,
      groupMembersEmails,
      groupMembersLimit,
      mainProps,
    ],
  );

  return {
    inviteTeammatesDialogProps,
    isInviteTeammatesDialogLoading,
    handleInviteTeammatesDialogOpen,
  };
};
