import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { DeclineButton } from 'domains/userSettings/screens/TeamInvitation/components/DeclineButton';

import { JoinButton } from '../JoinButton';
import { SignInButton } from '../SignInButton';
import { TeamInvitationFormProps } from './types';
import { Title } from '../Title';
import { hasDeclineButton } from './utils/hasDeclineButton';
import { hasSignInButton } from './utils/hasSignInButton';
import { useTeamInvitationFormStyles } from './useTeamInvitationFormStyles';

// This rule enforces using destructuring but it's extremely inconvinient
// to do here because of props type narrowing
/* eslint-disable react/destructuring-assignment */

export const TeamInvitationForm = (props: TeamInvitationFormProps) => {
  const { isJoining, onJoin, teamName } = props;

  const { classes } = useTeamInvitationFormStyles();

  return (
    <div className={classes.root}>
      <Title className={classes.title} teamName={teamName} />
      <Typography className={classes.description} component="p" variant="body2">
        {t('teams.team-invitation-dialog.description')}
      </Typography>
      <JoinButton
        className={classes.joinButton}
        isJoining={isJoining}
        onClick={onJoin}
      />
      {hasDeclineButton(props) && (
        <DeclineButton
          isDeclining={props.isDeclining}
          isDisabled={isJoining}
          onDecline={props.onDecline}
          onDeclineDialogClose={props.onDeclineDialogClose}
          onDeclineDialogOpen={props.onDeclineDialogOpen}
          teamName={teamName}
        />
      )}
      {hasSignInButton(props) && (
        <SignInButton
          isDisabled={isJoining}
          onClick={props.onSignInWithAnotherEmail}
        />
      )}
    </div>
  );
};
