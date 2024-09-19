import { Close, Minimize } from '@ankr.com/ui';
import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogProps as MuiDialogProps,
  DialogProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { DialogTitle, DialogTitleColor } from './types';
import { useStyles } from './DialogStyles';

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
  onClose?: () => void;
  onManualClose?: () => void;
  paperClassName?: string;
  shouldHideCloseButton?: boolean;
  shouldStopPropagationOnClose?: boolean;
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
  onManualClose,
  paperClassName,
  shouldHideCloseButton = false,
  shouldStopPropagationOnClose,
  title,
  titleClassName,
  ...props
}: IDialogProps) => {
  const { isLightTheme } = useThemes();

  const [dialogTitle, setDialogTitle] = useState<DialogTitle>({
    title: initialTitle,
    color: DialogTitleColor.Regular,
  });

  const handleClose = useCallback<Required<DialogProps>['onClose']>(
    (event, reason) => {
      if (shouldStopPropagationOnClose) {
        (event as MouseEvent<HTMLButtonElement>).stopPropagation();
      }

      onClose?.();

      const isBackdropClick = reason === 'backdropClick';
      const isEscapeKeyDown = reason === 'escapeKeyDown';

      if (isBackdropClick || isEscapeKeyDown) {
        onManualClose?.();
      }
    },
    [onClose, onManualClose, shouldStopPropagationOnClose],
  );

  const onCloseIconClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    onClose?.();
    onManualClose?.();
  }, [onClose, onManualClose]);

  useLayoutEffect(() => {
    setDialogTitle({ title });
  }, [title]);

  const { classes, cx } = useStyles({
    dialogTitleColor: dialogTitle.color || DialogTitleColor.Regular,
    isHidden,
    isLightTheme,
    maxPxWidth,
  });

  return (
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
      onClose={canCloseDialogByClickOutside ? handleClose : undefined}
    >
      <div tabIndex={0} role="button" onClick={e => e.stopPropagation()}>
        {(dialogTitle.title || !shouldHideCloseButton) && (
          <MuiDialogTitle className={cx(classes.dialogTitle, titleClassName)}>
            {typeof dialogTitle.title === 'string' && hasTitleWrapper ? (
              <Typography
                className={cx(classes.titleText, {
                  [classes.titleWithPaddingRight]: !shouldHideCloseButton,
                })}
              >
                {dialogTitle.title}
              </Typography>
            ) : (
              dialogTitle.title
            )}

            {!shouldHideCloseButton && (
              <IconButton
                aria-label="close"
                className={cx(classes.closeButton, closeButtonClassName)}
                onClick={onCloseIconClick}
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
  );
};
