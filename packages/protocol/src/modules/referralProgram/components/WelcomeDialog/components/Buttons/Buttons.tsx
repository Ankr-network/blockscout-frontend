import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  hasJoinButton?: boolean;
  isJoining?: boolean;
  onCancelButtonClick: () => void;
  onJoinButtonClick: () => Promise<void>;
  onSignInButtonClick: () => void;
}

export const Buttons = ({
  hasJoinButton,
  isJoining,
  onCancelButtonClick,
  onJoinButtonClick,
  onSignInButtonClick,
}: IButtonsProps) => {
  const { keys, t } = useTranslation(buttonsTranslation);

  const { classes } = useButtonsStyles();

  const joinButton = (
    <LoadingButton
      color="primary"
      loading={isJoining}
      onClick={onJoinButtonClick}
      size="large"
      variant="contained"
    >
      {t(keys.joinButton)}
    </LoadingButton>
  );

  const signInButton = (
    <Button
      color="primary"
      onClick={onSignInButtonClick}
      size="large"
      variant="contained"
    >
      {t(keys.signInButton)}
    </Button>
  );

  return (
    <div className={classes.root}>
      {hasJoinButton ? joinButton : signInButton}
      <Button
        color="primary"
        onClick={onCancelButtonClick}
        size="large"
        variant="outlined"
      >
        {t(keys.cancelButton)}
      </Button>
    </div>
  );
};
