import { Close } from '@ankr.com/ui';
import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@mui/material';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { DialogContext } from './DialogContext';
import { useStyles } from './DialogStyles';
import { DialogTitle, DialogTitleColor, IDialogContext } from './types';

export type IDialogProps = Omit<
  MuiDialogProps,
  'BackdropProps' | 'PaperProps'
> & {
  onClose: () => void;
  initialTitle?: string;
  title?: string;
  maxPxWidth?: number;
  paperClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
};

export const Dialog = ({
  children,
  onClose,
  initialTitle = '',
  title,
  maxPxWidth,
  paperClassName,
  titleClassName,
  closeButtonClassName,
  ...props
}: IDialogProps) => {
  const { isLightTheme } = useThemes();

  const [dialogTitle, setDialogTitle] = useState<DialogTitle>({
    title: initialTitle,
    color: DialogTitleColor.Regular,
  });

  useLayoutEffect(() => {
    setDialogTitle({ title });
  }, [title]);

  const value: IDialogContext = useMemo(
    () => ({ dialogTitle, setDialogTitle, closeDialog: onClose }),
    [dialogTitle, onClose],
  );

  const { classes, cx } = useStyles({
    dialogTitleColor: dialogTitle.color || DialogTitleColor.Regular,
    maxPxWidth,
    isLightTheme,
  });

  return (
    <DialogContext.Provider value={value}>
      <MuiDialog
        PaperProps={{
          classes: {
            root: cx(classes.paper, paperClassName),
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
        <MuiDialogTitle className={cx(classes.dialogTitle, titleClassName)}>
          {dialogTitle.title}

          {onClose ? (
            <IconButton
              aria-label="close"
              className={cx(classes.closeButton, closeButtonClassName)}
              onClick={onClose}
            >
              <Close />
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
