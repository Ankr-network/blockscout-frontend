import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  isConverting: boolean;
  onCancelButtonClick: () => void;
  onConfirmButtonClick: () => void;
}

export const Buttons = ({
  isConverting,
  onCancelButtonClick,
  onConfirmButtonClick,
}: IButtonsProps) => {
  const { classes } = useButtonsStyles();

  const { keys, t } = useTranslation(buttonsTranslation);

  return (
    <div className={classes.root}>
      <LoadingButton
        color="primary"
        loading={isConverting}
        onClick={onConfirmButtonClick}
        size="large"
        variant="contained"
      >
        {t(isConverting ? keys.pendingButton : keys.confirmButton)}
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
