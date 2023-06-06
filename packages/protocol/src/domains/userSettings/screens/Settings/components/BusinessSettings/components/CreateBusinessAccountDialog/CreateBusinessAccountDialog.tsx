import { Dialog } from 'uiKit/Dialog';
import { useCreateBusinessAccountDialogStyles } from './CreateBusinessAccountDialogStyles';
import { CreateBusinessAccountForm } from '../CreateBusinessAccountForm';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface CreateBusinessAccountDialogProps {
  onClose: () => void;
  isOpened: boolean;
}

export const CreateBusinessAccountDialog = ({
  isOpened,
  onClose,
}: CreateBusinessAccountDialogProps) => {
  const { classes } = useCreateBusinessAccountDialogStyles();
  const { email } = useAuth();

  return (
    <Dialog
      className={classes.root}
      maxPxWidth={620}
      open={isOpened}
      paperClassName={classes.paperRoot}
      titleClassName={classes.title}
      onClose={onClose}
    >
      <CreateBusinessAccountForm onSubmit={onClose} email={email} />
    </Dialog>
  );
};
