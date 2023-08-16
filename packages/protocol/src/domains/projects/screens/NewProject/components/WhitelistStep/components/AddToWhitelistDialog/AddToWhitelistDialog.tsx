import { t, tHTML } from '@ankr.com/common';
import { Box, Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';
import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';

import { useAddToWhitelistDialogStyles } from './useAddToWhitelistDialogStyles';
import { AddAndEditWhitelistItemForm } from './components/AddAndEditWhitelistItemForm';

interface AddToWhitelistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToWhitelistDialog = ({
  isOpen,
  onClose,
}: AddToWhitelistDialogProps) => {
  const { classes } = useAddToWhitelistDialogStyles();

  const { isEditingWhitelistDialog } = useProjectFormValues();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title={t(
        `projects.add-whitelist-dialog.titles.${
          isEditingWhitelistDialog ? 'edit' : 'add'
        }`,
      )}
    >
      <Box className={classes.root}>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {tHTML('projects.add-whitelist-dialog.description')}
        </Typography>

        <AddAndEditWhitelistItemForm onClose={onClose} />

        <Button fullWidth size="large" variant="outlined" onClick={onClose}>
          {t('projects.add-whitelist-dialog.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
};
