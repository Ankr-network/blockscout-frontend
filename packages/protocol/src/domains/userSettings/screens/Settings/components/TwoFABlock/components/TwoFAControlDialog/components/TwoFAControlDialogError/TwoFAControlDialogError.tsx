import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';
import { useTwoFAControlDialogContentStyles } from '../../TwoFAControlDialogStyles';

interface TwoFAControlDialogErrorProps {
  handleClose: () => void;
  handleClick: () => void;
}

export const TwoFAControlDialogError = ({
  handleClose,
  handleClick,
}: TwoFAControlDialogErrorProps) => {
  const { classes } = useTwoFAControlDialogContentStyles();

  return (
    <div>
      <Typography
        className={classes.description}
        variant="body1"
        component="div"
      >
        {t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.error.description`)}
      </Typography>
      <Button
        fullWidth
        size="large"
        onClick={handleClick}
        color="error"
        className={classes.button}
      >
        {t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.error.try-again`)}
      </Button>
      <Button fullWidth size="large" onClick={handleClose} variant="outlined">
        {t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.close`)}
      </Button>
    </div>
  );
};
