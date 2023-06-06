import { Dialog } from 'uiKit/Dialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInviteUserDialogStyles } from './InviteUserDialogStyles';
import { InviteUserForm } from '../InviteUserForm';

export interface CreateBusinessAccountDialogProps {
  onClose: () => void;
  isOpened: boolean;
}

export const InviteUserDialog = ({
  isOpened,
  onClose,
}: CreateBusinessAccountDialogProps) => {
  const { classes } = useInviteUserDialogStyles();
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
      <InviteUserForm onSubmit={onClose} email={email} />
    </Dialog>
  );
};
