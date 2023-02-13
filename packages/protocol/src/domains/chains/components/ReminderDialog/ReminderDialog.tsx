import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useReminderConfigEmail } from './hooks/useReminderConfigEmail';
import { setReminderConfigEmail } from 'domains/auth/store/userConfigSlice';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Dialog } from 'uiKit/Dialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import ReminderIcon from './assets/reminder.png';
import { useReminderDialogStyles } from './useReminderDialogStyles';
import { ConfirmReminderDialog } from '../ConfirmReminderDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const ReminderDialog = () => {
  const { isOpened, onOpen, onClose } = useDialog();
  const { address } = useAuth();

  const {
    isOpened: isConfirmOpened,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDialog();

  const { classes } = useReminderDialogStyles();

  const dispatch = useDispatch();

  const handleDispatch = useCallback(
    () => dispatch(setReminderConfigEmail(address)),
    [address, dispatch],
  );

  const { hasReminderConfigEmail } = useReminderConfigEmail(address);

  useOnMount(() => {
    if (!hasReminderConfigEmail) {
      onOpen();
    }
  });

  const handleClose = useCallback(() => {
    onClose();
    handleDispatch();
  }, [onClose, handleDispatch]);

  const handleOpenConfirm = useCallback(() => {
    onOpenConfirm();
    handleDispatch();
  }, [onOpenConfirm, handleDispatch]);

  return (
    <>
      <Dialog maxPxWidth={580} open={isOpened} onClose={handleClose}>
        <div className={classes.root}>
          <div className={classes.icon}>
            <img src={ReminderIcon} alt="icon" />
          </div>
          <Typography variant="h5" className={classes.title}>
            {t('reminder-dialog.title')}
          </Typography>
          <Typography className={classes.content}>
            {t('reminder-dialog.content')}
          </Typography>
          <Button
            size="large"
            variant="contained"
            fullWidth
            className={classes.button}
            onClick={handleOpenConfirm}
          >
            {t('reminder-dialog.customize')}
          </Button>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={handleClose}
          >
            {t('reminder-dialog.skip')}
          </Button>
        </div>
        <ConfirmReminderDialog
          isOpened={isConfirmOpened}
          onClose={onCloseConfirm}
        />
      </Dialog>
    </>
  );
};
