import { t, tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { PATH_SETTINGS } from 'domains/userSettings/Routes';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { useConfirmReminderDialogStyles } from './useConfirmReminderDialogStyles';

interface IConfirmReminderDialogProps {
  isOpened: boolean;
  onClose: () => void;
}

export const ConfirmReminderDialog = ({
  isOpened,
  onClose,
}: IConfirmReminderDialogProps) => {
  const { classes } = useConfirmReminderDialogStyles();

  return (
    <Dialog open={isOpened} onClose={onClose} maxPxWidth={618}>
      <div className={classes.dialog}>
        <Typography variant="h5" className={classes.title}>
          {t('confirm-reminder-dialog.title')}
        </Typography>
        <Typography className={classes.message} component="div">
          {tHTML('confirm-reminder-dialog.message')}
          <br />
          <NavLink href={PATH_SETTINGS} className={classes.button}>
            {t('confirm-reminder-dialog.settings')}
          </NavLink>
        </Typography>
      </div>
    </Dialog>
  );
};
