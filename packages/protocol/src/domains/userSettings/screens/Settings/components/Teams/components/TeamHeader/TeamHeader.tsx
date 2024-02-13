import { AddUser, Check, LoadingButton, More } from '@ankr.com/ui';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { IApiUserGroupDetails, UserGroup } from 'multirpc-sdk';
import { useMemo } from 'react';

import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';
import { Avatar } from 'domains/userGroup/components/Avatar';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useUserGroupItemStyles } from '../../../UserGroupItem/useUserGroupItemStyles';

interface TeamHeaderProps {
  group: UserGroup;
  groupDetails?: IApiUserGroupDetails;
  handleInviteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isCurrentGroupActive: boolean;
  isGroupAvailableForManagement: boolean;
  isInviteTeammatesDialogLoading: boolean;
  hasRenamePermissions: boolean;
}

// eslint-disable-next-line max-lines-per-function
export const TeamHeader = ({
  group: {
    index,
    address,
    role,
    membersCount = 0,
    membersLimit = 0,
    invitesCount = 0,
    name,
  },
  groupDetails,
  handleInviteClick,
  handleMenuClick,
  isCurrentGroupActive,
  isGroupAvailableForManagement,
  hasRenamePermissions,
  isInviteTeammatesDialogLoading,
}: TeamHeaderProps) => {
  const { classes } = useUserGroupItemStyles();

  const isCurrentGroupDetails = address === groupDetails?.address;
  const { address: currentUserAddress = '' } = useAuth();

  const groupSummary = useMemo(() => {
    const userRole = getUserRoleName(role);

    if (!isGroupAvailableForManagement) {
      return userRole;
    }

    if (isCurrentGroupDetails) {
      const currentUser = groupDetails.members.find(
        member =>
          member.address.toLowerCase() === currentUserAddress.toLowerCase(),
      );

      return t('teams.teams-list.team-info', {
        role: getUserRoleName(currentUser?.role || role) || userRole,
        membersCount: groupDetails?.members?.length || membersCount,
        membersLimit: groupDetails?.members_limit || membersLimit,
        invitesCount: groupDetails?.invitations?.length || invitesCount,
      });
    }

    return t('teams.teams-list.team-info', {
      role: userRole,
      membersCount,
      membersLimit,
      invitesCount,
    });
  }, [
    currentUserAddress,
    groupDetails?.invitations?.length,
    groupDetails?.members,
    groupDetails?.members_limit,
    invitesCount,
    isCurrentGroupDetails,
    isGroupAvailableForManagement,
    membersCount,
    membersLimit,
    role,
  ]);

  const isInvitationDisabled = useMemo(() => {
    if (isCurrentGroupDetails && groupDetails) {
      const currentGroupMembersCount =
        groupDetails?.members?.length || membersCount;
      const currentGroupInvitesCount =
        groupDetails?.invitations?.length || invitesCount;
      const currentGroupMembersLimit =
        groupDetails?.members_limit || membersLimit;

      return (
        currentGroupMembersCount + currentGroupInvitesCount >=
        currentGroupMembersLimit
      );
    }

    return membersCount + invitesCount >= membersLimit;
  }, [
    membersCount,
    invitesCount,
    membersLimit,
    isCurrentGroupDetails,
    groupDetails,
  ]);

  return (
    <>
      <div className={classes.groupInfo}>
        <div className={classes.avatarWrapper}>
          <Avatar
            className={classes.avatar}
            avatarColor={getAvatarColor(index)}
            name={name}
          />
          {isCurrentGroupActive && <Check className={classes.checkIcon} />}
        </div>
        <div>
          <Typography variant="subtitle1" component="p">
            {name}
          </Typography>
          <Typography variant="body4" color="textSecondary">
            {groupSummary}
          </Typography>
        </div>
      </div>
      {isGroupAvailableForManagement && (
        <div className={classes.groupActions}>
          <LoadingButton
            loading={isInviteTeammatesDialogLoading}
            onClick={handleInviteClick}
            size="medium"
            startIcon={<AddUser />}
            disabled={isInvitationDisabled}
          >
            {t('teams.teams-list.invite-button')}
          </LoadingButton>
          {hasRenamePermissions && (
            <Button
              onClick={handleMenuClick}
              className={classes.moreButton}
              size="medium"
              variant="outlined"
            >
              <More size="small" />
            </Button>
          )}
        </div>
      )}
    </>
  );
};
