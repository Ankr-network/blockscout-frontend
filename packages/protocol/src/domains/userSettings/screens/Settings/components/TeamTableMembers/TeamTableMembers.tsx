import { TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { GroupUserRole, IUserGroupMember, Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { Question } from '@ankr.com/ui';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';
import { Avatar } from 'domains/userGroup/components/Avatar';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

import { useRemoveTeamMember } from '../../hooks/useRemoveTeamMember';
import { UserRoleSelect } from '../Teams/components/UserRoleSelect';
import { RemoveTeammateDialog } from '../Teams/components/RemoveTeammateDialog';
import { TransferOwnershipDialog } from '../Teams/components/TransferOwnershipDialog';
import { TeamMemberActions } from '../TeamMemberActions';
import { useTeamTableStyles } from '../TeamTable/useTeamTableStyles';
import { LeaveTeamDialog } from '../Teams/components/LeaveTeamDialog';

interface TeamTableMembersProps {
  members: IUserGroupMember[];
  groupAddress: Web3Address;
  isGroupAvailableForManagement: boolean;
}

export const TeamTableMembers = ({
  members,
  groupAddress,
  isGroupAvailableForManagement,
}: TeamTableMembersProps) => {
  const { address: userAddress } = useAuth();

  const {
    isOpened: isOpenedRemoveTeamMemberDialog,
    handleClose: onCloseRemoveTeamMemberDialog,
    teammateToRemoveAddress,
    teammateToRemoveEmail,
    handleRemoveUser,
  } = useRemoveTeamMember();

  const {
    isOpened: isTrasnferOwnershipDialogOpened,
    onOpen: onOpenTrasnferOwnershipDialog,
    onClose: onCloseTrasnferOwnershipDialog,
  } = useDialog();

  const {
    isOpened: isLeaveTeamDialogOpened,
    onOpen: onOpenLeaveTeamDialog,
    onClose: onCloseLeaveTeamDialog,
  } = useDialog();

  const handleTransferOwnership = useCallback(() => {
    onOpenTrasnferOwnershipDialog();
  }, [onOpenTrasnferOwnershipDialog]);

  const handleLeaveTeam = useCallback(() => {
    onOpenLeaveTeamDialog();
  }, [onOpenLeaveTeamDialog]);

  const { classes, cx } = useTeamTableStyles();

  return (
    <>
      {members.map((member, index) => {
        const isCurrentUser =
          member.address.toLowerCase() === userAddress.toLowerCase();

        const isRoleSelectorDisabled =
          isCurrentUser && member.role !== GroupUserRole.admin;

        const isUserOwner = member.role === GroupUserRole.owner;

        const name = member.email || shrinkAddress(member.address);

        return (
          <TableRow className={classes.row} key={member.address}>
            <TableCell className={cx(classes.cell, classes.td)}>
              <Avatar
                className={classes.avatar}
                avatarColor={getAvatarColor(index)}
                name={name}
              />
              {name}
              {isCurrentUser && (
                <Typography variant="body3" color="textSecondary" ml={1}>
                  {t('teams.team-table.you')}
                </Typography>
              )}
            </TableCell>
            <TableCell
              className={cx(classes.cell, classes.td, classes.roleCell)}
            >
              <UserRoleSelect
                isPlainTextView={isGroupAvailableForManagement}
                isDisabled={isRoleSelectorDisabled}
                currentRole={member.role}
                email={member.email}
                userAddress={member.address}
                group={groupAddress}
              />
              {isCurrentUser && isUserOwner && (
                <Tooltip
                  className={classes.roleTooltip}
                  title={t('teams.team-table.owner-tooltip')}
                >
                  <Question className={classes.questionIcon} />
                </Tooltip>
              )}
            </TableCell>
            <TableCell align="right" className={cx(classes.cell, classes.td)}>
              <TeamMemberActions
                member={member}
                membersCount={members.length}
                handleTransferOwnership={handleTransferOwnership}
                handleLeaveTeam={handleLeaveTeam}
                handleRemoveUser={() =>
                  handleRemoveUser(member.address, member.email)
                }
              />
            </TableCell>
          </TableRow>
        );
      })}

      <RemoveTeammateDialog
        open={isOpenedRemoveTeamMemberDialog}
        onClose={onCloseRemoveTeamMemberDialog}
        address={teammateToRemoveAddress}
        group={groupAddress}
        email={teammateToRemoveEmail}
      />

      <TransferOwnershipDialog
        members={members}
        group={groupAddress}
        open={isTrasnferOwnershipDialogOpened}
        onClose={onCloseTrasnferOwnershipDialog}
      />

      <LeaveTeamDialog
        group={groupAddress}
        open={isLeaveTeamDialogOpened}
        onClose={onCloseLeaveTeamDialog}
      />
    </>
  );
};
