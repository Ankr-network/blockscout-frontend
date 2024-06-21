import { ReactNode } from 'react';

import { Dialog } from 'uiKit/Dialog';

import { useEditDialogStyles } from './EditDialogStyles';

export interface EditDialogProps {
  children: ReactNode;
  isOpened?: boolean;
  onClose: () => void;
  title: string;
}

export const EditDialog = ({
  children,
  isOpened = false,
  onClose,
  title,
}: EditDialogProps) => {
  const { classes } = useEditDialogStyles();

  return (
    <Dialog
      closeButtonClassName={classes.closeButton}
      onClose={onClose}
      open={isOpened}
      paperClassName={classes.root}
      title={title}
      titleClassName={classes.title}
    >
      {children}
    </Dialog>
  );
};
