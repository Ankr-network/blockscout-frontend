import { GroupUserRole, IUserGroupMember } from 'multirpc-sdk';
import { Button, Tooltip } from '@mui/material';
import { t } from '@ankr.com/common';
import { Delete } from '@ankr.com/ui';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { getPermissions } from 'modules/groups/utils/getPermissions';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useTeamMemberActionsStyles } from './useTeamMemberActionsStyles';

interface TeamMemberActionsProps {
  member: IUserGroupMember;
  membersCount: number;
  handleTransferOwnership: () => void;
  handleLeaveTeam: () => void;
  handleRemoveUser: () => void;
}

export const TeamMemberActions = ({
  member,
  membersCount,
  handleTransferOwnership,
  handleLeaveTeam,
  handleRemoveUser,
}: TeamMemberActionsProps) => {
  const { address: userAddress } = useAuth();
  const isCurrentUser =
    member.address.toLowerCase() === userAddress.toLowerCase();
  const permissions = getPermissions(member.role);

  const hasTransferOwnershipPermission = permissions.includes(
    BlockWithPermission.TeamOwnershipTransfer,
  );

  const { classes } = useTeamMemberActionsStyles();

  const isOwner = member.role === GroupUserRole.owner;
  const isOnlyOneMember = membersCount === 1;

  if (isCurrentUser) {
    if (hasTransferOwnershipPermission) {
      if (isOnlyOneMember) {
        return (
          <Tooltip placement="top" title={t('teams.team-table.tooltip')}>
            <Button size="small" variant="outlined" color="secondary">
              {t('teams.team-table.transfer-ownership')}
            </Button>
          </Tooltip>
        );
      }

      return (
        <Button
          size="small"
          variant="outlined"
          onClick={handleTransferOwnership}
          color="secondary"
        >
          {t('teams.team-table.transfer-ownership')}
        </Button>
      );
    }

    return (
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={handleLeaveTeam}
      >
        {t('teams.team-table.leave-team')}
      </Button>
    );
  }

  if (!isOwner) {
    return (
      <Button
        size="small"
        variant="text"
        color="secondary"
        onClick={handleRemoveUser}
        className={classes.btn}
      >
        <Delete />
      </Button>
    );
  }

  return null;
};
