import { TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { IPendingUserGroupMember } from 'multirpc-sdk';
import { Question } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Avatar } from 'domains/userGroup/components/Avatar';

import { useRevokeInvitation } from '../../hooks/useRevokeInvitationDialog';
import { RevokeInvitationDialog } from '../Teams/components/RevokeInvitationDialog';
import { UserRoleSelect } from '../Teams/components/UserRoleSelect';
import { PendingTeamMemberActions } from '../PendingTeamMemberActions';
import { useTeamTableStyles } from '../TeamTable/useTeamTableStyles';
import { useResendInvitation } from '../../hooks/useResendInvitationDialog';

interface TeamTablePendingMembersProps {
  pendingMembers: IPendingUserGroupMember[];
  groupAddress: string;
  isGroupAvailableForManagement: boolean;
}

export const TeamTablePendingMembers = ({
  pendingMembers,
  groupAddress,
  isGroupAvailableForManagement,
}: TeamTablePendingMembersProps) => {
  const {
    isOpened: isOpenedRevokeInvitationDialog,
    handleClose: onCloseRevokeInvitationDialog,
    emailToRevoke,
    handleRevokeInvitation,
  } = useRevokeInvitation();

  const {
    isLoadingResendTeamInvite,
    handleResendInvitation,
    originalArgs: currentInvitationParams,
  } = useResendInvitation(groupAddress);

  const { classes, cx } = useTeamTableStyles();

  return (
    <>
      {pendingMembers?.map(({ status, email: name, role, url, address }) => {
        const statusString =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        const isCurrentMemeberHasLoadingStatus =
          name.toLowerCase() === currentInvitationParams?.email.toLowerCase() &&
          isLoadingResendTeamInvite;

        return (
          <TableRow className={classes.row} key={name}>
            <TableCell className={cx(classes.cell, classes.td)}>
              <div className={classes.pendingMemberCellContent}>
                <Avatar
                  className={cx(classes.avatar, classes.avatarPending)}
                  avatarColor="transparent"
                  name={name}
                />
                <div className={classes.pendingMemberInfo}>
                  <Typography variant="body3">{name}</Typography>
                  <Typography
                    variant="body4"
                    color="textSecondary"
                    className={classes.userStatus}
                  >
                    {statusString}
                  </Typography>
                </div>
              </div>
            </TableCell>
            <TableCell
              className={cx(classes.cell, classes.td, classes.roleCell)}
            >
              <UserRoleSelect
                isPlainTextView={isGroupAvailableForManagement}
                currentRole={role}
                userAddress={address}
                email={name}
                group={groupAddress}
                isDisabled={!address}
              />
              <Tooltip
                className={classes.roleTooltip}
                title={t('teams.team-table.pending-tooltip')}
              >
                <Question className={classes.questionIcon} />
              </Tooltip>
            </TableCell>
            <TableCell
              align="right"
              className={cx(classes.cell, classes.td, classes.actionsCell)}
            >
              <PendingTeamMemberActions
                inviteUrl={url}
                handleRevokeInvitation={() => handleRevokeInvitation(name)}
                handleResendInvite={() => handleResendInvitation(name)}
                isLoadingResendTeamInvite={isCurrentMemeberHasLoadingStatus}
              />
            </TableCell>
          </TableRow>
        );
      })}

      <RevokeInvitationDialog
        email={emailToRevoke}
        group={groupAddress}
        open={isOpenedRevokeInvitationDialog}
        onClose={onCloseRevokeInvitationDialog}
      />
    </>
  );
};
