import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { LoadingButton } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';

import { useConfirmCancellationDialogStyles } from './useConfirmCancellationDialogStyles';

interface IConfirmCancellationDialogProps {
  isOpened: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  isLoading?: boolean;
}

export const ConfirmCancellationDialog = ({
  description,
  isLoading,
  isOpened,
  onClose,
  onConfirm,
  title,
}: IConfirmCancellationDialogProps) => {
  const { classes } = useConfirmCancellationDialogStyles();

  const handleConfirm = useCallback(async () => {
    await onConfirm();
    onClose();
  }, [onClose, onConfirm]);

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      classes={{
        paper: classes.dialogPaper,
      }}
      dialogContentClassName={classes.dialogContent}
    >
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <Typography
        className={classes.description}
        variant="body2"
        component="p"
        color="textSecondary"
      >
        {description}
      </Typography>

      <LoadingButton
        fullWidth
        className={classes.btn}
        onClick={handleConfirm}
        color="error"
        loading={isLoading}
      >
        {t('common.confirm')}
      </LoadingButton>
      <Button
        fullWidth
        className={classes.btn}
        onClick={onClose}
        variant="outlined"
      >
        {t('common.cancel')}
      </Button>
    </Dialog>
  );
};
