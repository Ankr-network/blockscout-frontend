import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  DeclineButton,
  DeclineButtonProps,
} from 'domains/userSettings/screens/TeamInvitation/components/DeclineButton';

import { useButtonsStyles } from './useButtonsStyles';

export interface ButtonsProps extends Omit<DeclineButtonProps, 'isDisabled'> {
  onSignIn: () => void;
}

export const Buttons = ({ onSignIn, ...declineButtonProps }: ButtonsProps) => {
  const { isDeclining } = declineButtonProps;

  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      <Button fullWidth onClick={onSignIn} size="large" variant="contained">
        {t('teams.guest-team-invitation-dialog.sign-in-button')}
      </Button>
      <DeclineButton {...declineButtonProps} isDisabled={isDeclining} />
    </div>
  );
};
