import { t, tHTML } from '@ankr.com/common';
import { Box, Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';

import { useAddToWhitelistDialogStyles } from './useAddToWhitelistDialogStyles';
import { AddToWhitelistForm } from './components/AddToWhitelistForm';

interface AddToWhitelistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToWhitelistDialog = ({
  isOpen,
  onClose,
}: AddToWhitelistDialogProps) => {
  const { classes } = useAddToWhitelistDialogStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title={t('projects.add-whitelist.title')}
    >
      <Box className={classes.root}>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {tHTML('projects.add-whitelist.description')}
        </Typography>

        <AddToWhitelistForm onClose={onClose} />

        <Button fullWidth size="large" variant="outlined" onClick={onClose}>
          {t('projects.add-whitelist.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
};
