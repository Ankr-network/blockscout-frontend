import { t, tHTML } from '@ankr.com/common';
import { Box, Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';

import { useAddContractDialogStyles } from './useAddContractDialogStyles';

interface AddToWhitelistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const AddContractDialog = ({
  isOpen,
  onClose,
  onNext,
}: AddToWhitelistDialogProps) => {
  const { classes } = useAddContractDialogStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title={t('projects.add-contract-dialog.title')}
      titleClassName={classes.title}
    >
      <Box className={classes.root}>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {tHTML('projects.add-contract-dialog.description')}
        </Typography>

        <Button
          fullWidth
          size="large"
          onClick={onNext}
          className={classes.proceedButton}
        >
          {t('projects.add-contract-dialog.proceed')}
        </Button>
        <Button fullWidth size="large" variant="outlined" onClick={onClose}>
          {t('projects.add-contract-dialog.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
};
