import { UserGroup } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { getPermissions } from 'modules/groups/utils/getPermissions';
import { useLazyUserGroupFetchGroupDetailsQuery } from 'domains/userGroup/actions/fetchGroupDetails';
import { selectGroupDetailsRequestState } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';

import { useTeamItemAsyncAccordion } from './useTeamItemAsyncAccordion';
import { useInviteTeammatesDialog } from './useInviteTeammatesDialog';

export interface UseUserGroupItemProps {
  group: UserGroup;
}

export const useUserGroupItem = ({ group }: UseUserGroupItemProps) => {
  const { address: groupAddress, role: groupRole } = group;

  const [fetchGroupDetails] = useLazyUserGroupFetchGroupDetailsQuery();

  const {
    data: groupDetails,
    isLoading: isGroupDetailsLoading,
    originalArgs: fetchGroupDetailsArgs,
  } = useAppSelector(selectGroupDetailsRequestState);

  // We have to check that group details are fetching for the current group
  // address to prevent loading state on all the Invite buttons in the team list
  const isGroupDetailsFetchingForCurrentGroup =
    isGroupDetailsLoading && fetchGroupDetailsArgs?.group === groupAddress;

  const groupPermissions = useMemo(() => {
    const permissions = getPermissions(groupRole);

    const isGroupAvailableForManagement = permissions.includes(
      BlockWithPermission.TeamManagement,
    );
    const hasRenamePermissions = permissions.includes(
      BlockWithPermission.TeamRenaming,
    );

    return {
      isGroupAvailableForManagement,
      hasRenamePermissions,
    };
  }, [groupRole]);

  const isTeamManagementEnabled =
    groupPermissions.isGroupAvailableForManagement && !isGroupDetailsLoading;

  const handleFetchGroupDetails = useCallback(async () => {
    if (isTeamManagementEnabled) {
      await fetchGroupDetails({ group: groupAddress });
    }
  }, [fetchGroupDetails, groupAddress, isTeamManagementEnabled]);

  const {
    handleExpand: handleAccordionChange,
    isExpanded,
    isExpanding,
  } = useTeamItemAsyncAccordion({
    onExpand: handleFetchGroupDetails,
    groupAddress,
  });

  const {
    isInviteTeammatesDialogLoading,
    inviteTeammatesDialogProps,
    handleInviteTeammatesDialogOpen,
  } = useInviteTeammatesDialog({
    group,
    groupDetails,
    handleFetchGroupDetails,
    isGroupDetailsFetching: isGroupDetailsFetchingForCurrentGroup,
    isUserGroupExpanding: isExpanding,
  });

  return {
    groupDetails,
    handleAccordionChange,
    handleInviteTeammatesDialogOpen,
    inviteTeammatesDialogProps,
    isExpanded,
    isExpanding,
    isInviteTeammatesDialogLoading,
    ...groupPermissions,
  };
};
