import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { DeclineButton } from 'domains/userSettings/screens/TeamInvitation/components/DeclineButton';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';

import { JoinButton } from '../JoinButton';
import { SignInButton } from '../SignInButton';
import { TeamInvitationFormProps } from './types';
import { Title } from '../Title';
import { useTeamInvitationFormStyles } from './useTeamInvitationFormStyles';

export const TeamInvitationForm = ({
  isDeclining,
  isJoining,
  onDecline,
  onDeclineDialogClose,
  onDeclineDialogOpen,
  onJoin,
  onSignInWithAnotherEmail,
  role,
  teamName,
}: TeamInvitationFormProps) => {
  const roleName = getUserRoleName(role);

  const { classes } = useTeamInvitationFormStyles();

  return (
    <div className={classes.root}>
      <Title className={classes.title} teamName={teamName} />
      <Typography className={classes.description} component="p" variant="body2">
        {t('teams.team-invitation-dialog.description', { roleName })}
      </Typography>
      <div className={classes.buttons}>
        <JoinButton isJoining={isJoining} onClick={onJoin} />
        <DeclineButton
          isDeclining={isDeclining}
          isDisabled={isJoining}
          onDecline={onDecline}
          onDeclineDialogClose={onDeclineDialogClose}
          onDeclineDialogOpen={onDeclineDialogOpen}
          teamName={teamName}
        />
        <SignInButton
          className={classes.signInButton}
          isDisabled={isJoining}
          onClick={onSignInWithAnotherEmail}
        />
      </div>
    </div>
  );
};
