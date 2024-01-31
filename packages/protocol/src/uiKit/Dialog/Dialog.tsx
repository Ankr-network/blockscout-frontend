import { Close } from '@ankr.com/ui';
import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogProps,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import {
  MouseEvent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { DialogContext } from './DialogContext';
import { useStyles } from './DialogStyles';
import { DialogTitle, DialogTitleColor, IDialogContext } from './types';

export type IDialogProps = Omit<
  MuiDialogProps,
  'BackdropProps' | 'PaperProps' | 'title' | 'onClose'
> & {
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;
  shouldHideCloseButton?: boolean;
  initialTitle?: string;
  title?: ReactNode;
  maxPxWidth?: number;
  paperClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  canCloseDialogByClickOutside?: boolean;
  hasTitleWrapper?: boolean;
  isHidden?: boolean;
};

export const Dialog = ({
  children,
  onClose,
  shouldHideCloseButton = false,
  canCloseDialogByClickOutside = true,
  initialTitle = '',
  title,
  maxPxWidth,
  paperClassName,
  titleClassName,
  closeButtonClassName,
  hasTitleWrapper = true,
  isHidden = false,
  ...props
}: IDialogProps) => {
  const { isLightTheme } = useThemes();

  const [dialogTitle, setDialogTitle] = useState<DialogTitle>({
    title: initialTitle,
    color: DialogTitleColor.Regular,
  });

  const handleClose = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClose === 'function') {
        onClose(event);
      }
    },
    [onClose],
  );

  useLayoutEffect(() => {
    setDialogTitle({ title });
  }, [title]);

  const value: IDialogContext = useMemo(
    () => ({ dialogTitle, setDialogTitle, closeDialog: handleClose }),
    [dialogTitle, handleClose],
  );

  const { classes, cx } = useStyles({
    dialogTitleColor: dialogTitle.color || DialogTitleColor.Regular,
    isHidden,
    isLightTheme,
    maxPxWidth,
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
        classes={{
          ...props.classes,
          root: cx(classes.root, props.classes?.root),
        }}
        onClose={
          canCloseDialogByClickOutside
            ? (handleClose as DialogProps['onClose'])
            : undefined
        }
      >
        {(dialogTitle.title || !shouldHideCloseButton) && (
          <MuiDialogTitle className={cx(classes.dialogTitle, titleClassName)}>
            {typeof dialogTitle.title === 'string' && hasTitleWrapper ? (
              <Typography className={classes.titleText}>
                {dialogTitle.title}
              </Typography>
            ) : (
              dialogTitle.title
            )}

            {!shouldHideCloseButton && (
              <IconButton
                aria-label="close"
                className={cx(classes.closeButton, closeButtonClassName)}
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            )}
          </MuiDialogTitle>
        )}

        <MuiDialogContent className={classes.dialogContent}>
          {children}
        </MuiDialogContent>
      </MuiDialog>
    </DialogContext.Provider>
  );
};
