import { t } from '@ankr.com/common';
import { Box, Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';
import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import { WhiteListItem } from 'domains/projects/types';

import { useAddToWhitelistDialogStyles } from './useAddToWhitelistDialogStyles';
import { AddAndEditWhitelistItemForm } from './components/AddAndEditWhitelistItemForm';
import { getTitle } from './AddToWhitelistDialogUtils';
import { getDialogDescription } from './components/AddAndEditWhitelistItemForm/AddToWhitelistFormUtils';
import { ContractAttention } from './components/ContractAttention';

interface AddToWhitelistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToWhitelistDialog = ({
  isOpen,
  onClose,
}: AddToWhitelistDialogProps) => {
  const { classes } = useAddToWhitelistDialogStyles();

  const { isEditingWhitelistDialog, whitelistDialog } = useProjectFormValues();

  const { type } = whitelistDialog;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title={getTitle(isEditingWhitelistDialog, type)}
    >
      <Box className={classes.root}>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {getDialogDescription(type)}
        </Typography>
        {type === WhiteListItem.address && <ContractAttention />}

        <AddAndEditWhitelistItemForm onClose={onClose} />

        <Button fullWidth size="large" variant="outlined" onClick={onClose}>
          {t('projects.add-whitelist-dialog.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
};
