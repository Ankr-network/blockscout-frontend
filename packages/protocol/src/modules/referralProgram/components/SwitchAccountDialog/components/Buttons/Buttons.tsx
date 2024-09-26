import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  isSwitching: boolean;
  onCancelButtonClick: () => void;
  onSwitchButtonClick: () => void;
}

export const Buttons = ({
  isSwitching,
  onCancelButtonClick,
  onSwitchButtonClick,
}: IButtonsProps) => {
  const { keys, t } = useTranslation(buttonsTranslation);

  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      <LoadingButton
        color="primary"
        loading={isSwitching}
        onClick={onSwitchButtonClick}
        size="large"
        variant="contained"
      >
        {t(keys.switchButton)}
      </LoadingButton>
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
