import { Close, Minimize } from '@ankr.com/ui';
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
  canCloseDialogByClickOutside?: boolean;
  closeButtonClassName?: string;
  dialogContentClassName?: string;
  hasMinimizeIcon?: boolean;
  hasTitleWrapper?: boolean;
  initialTitle?: string;
  isHidden?: boolean;
  maxPxWidth?: number;
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;
  paperClassName?: string;
  shouldHideCloseButton?: boolean;
  title?: ReactNode;
  titleClassName?: string;
};

export const Dialog = ({
  canCloseDialogByClickOutside = true,
  children,
  closeButtonClassName,
  dialogContentClassName,
  hasMinimizeIcon,
  hasTitleWrapper = true,
  initialTitle = '',
  isHidden = false,
  maxPxWidth,
  onClose,
  paperClassName,
  shouldHideCloseButton = false,
  title,
  titleClassName,
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
        <div tabIndex={0} role="button" onClick={e => e.stopPropagation()}>
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
                  {hasMinimizeIcon ? <Minimize /> : <Close />}
                </IconButton>
              )}
            </MuiDialogTitle>
          )}

          <MuiDialogContent
            className={cx(classes.dialogContent, dialogContentClassName)}
          >
            {children}
          </MuiDialogContent>
        </div>
      </MuiDialog>
    </DialogContext.Provider>
  );
};
