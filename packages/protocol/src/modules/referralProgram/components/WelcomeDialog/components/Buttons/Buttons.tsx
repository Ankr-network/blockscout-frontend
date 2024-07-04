import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  hasActivateButton?: boolean;
  isActivating?: boolean;
  onActivateButtonClick: () => Promise<void>;
  onCancelButtonClick: () => void;
  onSignInButtonClick: () => void;
}

export const Buttons = ({
  hasActivateButton,
  isActivating,
  onActivateButtonClick,
  onCancelButtonClick,
  onSignInButtonClick,
}: IButtonsProps) => {
  const { keys, t } = useTranslation(buttonsTranslation);

  const { classes } = useButtonsStyles();

  const activateButton = (
    <LoadingButton
      color="primary"
      loading={isActivating}
      onClick={onActivateButtonClick}
      size="large"
      variant="contained"
    >
      {t(keys.activateButton)}
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
      {hasActivateButton ? activateButton : signInButton}
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
