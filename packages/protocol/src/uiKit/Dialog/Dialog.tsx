import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@material-ui/core';
import { useLayoutEffect, useMemo, useState } from 'react';

import { ReactComponent as CrossIcon } from 'uiKit/Icons/cross.svg';
import { DialogContext } from './DialogContext';
import { useStyles } from './DialogStyles';
import { DialogTitle, DialogTitleColor, IDialogContext } from './types';

type IDialogProps = Omit<MuiDialogProps, 'BackdropProps' | 'PaperProps'> & {
  onClose: () => void;
  initialTitle?: string;
  title?: string;
  maxPxWidth?: number;
};

export const Dialog = ({
  children,

  onClose,
  initialTitle = '',
  title,
  maxPxWidth,
  ...props
}: IDialogProps) => {
  const [dialogTitle, setDialogTitle] = useState<DialogTitle>({
    title: initialTitle,
    color: DialogTitleColor.Regular,
  });

  useLayoutEffect(() => {
    if (title) setDialogTitle({ title });
  }, [title]);

  const value: IDialogContext = useMemo(
    () => ({ dialogTitle, setDialogTitle, closeDialog: onClose }),
    [dialogTitle, onClose],
  );

  const classes = useStyles({
    dialogTitleColor: dialogTitle.color || DialogTitleColor.Regular,
    maxPxWidth,
  });

  return (
    <DialogContext.Provider value={value}>
      <MuiDialog
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        {...props}
        onClose={onClose}
      >
        <MuiDialogTitle className={classes.dialogTitle}>
          {dialogTitle.title}

          {onClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CrossIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>

        <MuiDialogContent className={classes.dialogContent}>
          {children}
        </MuiDialogContent>
      </MuiDialog>
    </DialogContext.Provider>
  );
};
