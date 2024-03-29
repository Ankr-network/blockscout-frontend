import { Button, CircularProgress } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { text } from '../../utils/text';
import { useButtonsStyles } from './ButtonsStyles';

export interface ButtonsProps {
  onConnectButtonClick: () => void;
}

export const Buttons = ({ onConnectButtonClick }: ButtonsProps) => {
  const { handleSignOut, loading } = useAuth();

  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.connectButton}
        color="error"
        disabled={loading}
        onClick={onConnectButtonClick}
        startIcon={loading && <CircularProgress size={18} color="inherit" />}
      >
        {text('connect-button')}
      </Button>
      <Button
        className={classes.logoutButton}
        onClick={handleSignOut}
        variant="outlined"
      >
        {text('logout-button')}
      </Button>
    </div>
  );
};
