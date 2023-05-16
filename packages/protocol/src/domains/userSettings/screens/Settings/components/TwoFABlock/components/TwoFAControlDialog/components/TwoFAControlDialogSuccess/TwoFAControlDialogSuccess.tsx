import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';
import { useTwoFAControlDialogContentStyles } from '../../TwoFAControlDialogStyles';

interface TwoFAControlDialogSuccessProps {
  handleClose: () => void;
  isEnabled?: boolean;
}

export const TwoFAControlDialogSuccess = ({
  handleClose,
  isEnabled,
}: TwoFAControlDialogSuccessProps) => {
  const { classes } = useTwoFAControlDialogContentStyles();

  return (
    <div>
      <Typography
        className={classes.description}
        variant="body1"
        component="div"
      >
        {t(
          `${USER_SETTINGS_INTL_ROOT}.control-dialog.success.description-${
            isEnabled ? 'deactivate' : 'activate'
          }`,
        )}
      </Typography>
      <Button fullWidth size="large" onClick={handleClose}>
        {t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.close`)}
      </Button>
    </div>
  );
};
