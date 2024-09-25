import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { buttonsTranslation } from './translation';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  isApplyButtonDisabled?: boolean;
  isApplying?: boolean;
  onApplyButtonClick: () => void;
  onCancelButtonClick: () => void;
}

export const Buttons = ({
  isApplyButtonDisabled,
  isApplying,
  onApplyButtonClick,
  onCancelButtonClick,
}: IButtonsProps) => {
  const { classes } = useButtonsStyles();
  const { keys, t } = useTranslation(buttonsTranslation);

  return (
    <div className={classes.referralCodeDialogButtonsRoot}>
      <LoadingButton
        disabled={isApplyButtonDisabled}
        loading={isApplying}
        onClick={onApplyButtonClick}
        size="large"
        variant="contained"
      >
        {t(keys.applyButton)}
      </LoadingButton>
      <Button onClick={onCancelButtonClick} size="large" variant="outlined">
        {t(keys.cancelButton)}
      </Button>
    </div>
  );
};
