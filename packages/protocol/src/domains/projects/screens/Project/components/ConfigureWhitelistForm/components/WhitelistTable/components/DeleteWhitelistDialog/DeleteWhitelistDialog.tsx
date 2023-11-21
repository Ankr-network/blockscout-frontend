import { Dialog } from 'uiKit/Dialog';

import { CancelButton } from './components/CancelButton';
import { DeleteButton } from './components/DeleteButton';
import { DialogDescription } from './components/DialogDescription';
import { DialogTitle } from './components/DialogTitle';
import { useDeleteWhitelistDialogStyles } from './useDeleteWhitelistDialogStyles';

export interface DeleteWhitelistDialogProps {
  handleDelete: () => void;
  isDeleting: boolean;
  isOpened: boolean;
  onClose: () => void;
}

export const DeleteWhitelistDialog = ({
  handleDelete,
  isDeleting,
  isOpened,
  onClose,
}: DeleteWhitelistDialogProps) => {
  const { classes } = useDeleteWhitelistDialogStyles();

  return (
    <Dialog
      fullWidth
      maxPxWidth={600}
      onClose={onClose}
      open={isOpened}
      title={<DialogTitle />}
      titleClassName={classes.title}
    >
      <DialogDescription />
      <div className={classes.buttons}>
        <DeleteButton isLoading={isDeleting} onClick={handleDelete} />
        <CancelButton onClick={onClose} />
      </div>
    </Dialog>
  );
};
