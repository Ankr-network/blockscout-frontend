import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { CancelButton } from '../CancelButton';
import { EmailsInput } from '../EmailsInput';
import { InviteButton } from '../InviteButton';
import { InviteeRolePermissions } from '../InviteeRolePermissions';
import { InviteeRoleSelector } from '../InviteeRoleSelector';
import { useInviteTeammatesFormStyles } from './useInviteTeammatesFormStyles';
import { useInviteTeammatesForm } from './hooks/useInviteTeammatesForm';

export interface InviteTeammatesFormProps {
  group: string;
  handleCloseDialog?: () => void;
  invitedEmails: string[];
  teamMembersCount: number;
  teamMembersLimit: number;
}

export const InviteTeammatesForm = ({
  group,
  handleCloseDialog,
  invitedEmails,
  teamMembersCount,
  teamMembersLimit,
}: InviteTeammatesFormProps) => {
  const {
    errorMessage,
    handleInvite,
    inviteeRole,
    isInviting,
    onEmailsInputChange,
    onInviteeRoleChange,
    value,
  } = useInviteTeammatesForm({
    group,
    handleCloseDialog,
    invitedEmails,
    teamMembersCount,
    teamMembersLimit,
  });

  const { classes } = useInviteTeammatesFormStyles();

  return (
    <>
      <Typography className={classes.description} component="p" variant="body2">
        {t('teams.invite-teammates-dialog.description')}
      </Typography>
      <EmailsInput
        className={classes.input}
        errorMessage={errorMessage}
        invitedEmails={invitedEmails}
        onChange={onEmailsInputChange}
        teamMembersCount={teamMembersCount}
        teamMembersLimit={teamMembersLimit}
        value={value}
      />
      <InviteeRoleSelector
        className={classes.selector}
        onChange={onInviteeRoleChange}
        value={inviteeRole}
      />
      <InviteeRolePermissions
        className={classes.permissions}
        role={inviteeRole}
      />
      <InviteButton
        className={classes.inviteButton}
        isInviting={isInviting}
        onClick={handleInvite}
      />
      <CancelButton isDisabled={isInviting} onClick={handleCloseDialog} />
    </>
  );
};
