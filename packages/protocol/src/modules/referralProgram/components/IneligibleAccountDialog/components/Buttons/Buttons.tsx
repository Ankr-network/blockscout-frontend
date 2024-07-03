import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  onCancelButtonClick: () => void;
  onSignInButtonClick: () => void;
}

export const Buttons = ({
  onCancelButtonClick,
  onSignInButtonClick,
}: IButtonsProps) => {
  const { keys, t } = useTranslation(buttonsTranslation);

  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        onClick={onSignInButtonClick}
        size="large"
        variant="contained"
      >
        {t(keys.signInButton)}
      </Button>
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
