import { Dialog as DialogMUI, DialogProps } from '@material-ui/core';
import classNames from 'classnames';

import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';

import { useDialogStyles as useStyles } from './useDialogStyles';

interface IDialogProps extends DialogProps {
  isHiddenCloseBtn?: boolean;
  onClose?: () => void;
}

export const Dialog = ({
  children,
  classes: dialogClasses,
  className,
  isHiddenCloseBtn = false,
  open,
  PaperProps,
  onClose,
  ...restDialogProps
}: IDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <DialogMUI
      {...restDialogProps}
      fullWidth
      classes={{ ...dialogClasses, paper: classNames(classes.box, className) }}
      maxWidth="sm"
      open={open}
      PaperProps={{ ...PaperProps, square: false, variant: 'elevation' }}
      scroll="body"
      onClose={onClose}
    >
      {!isHiddenCloseBtn && (
        <Button
          className={classes.closeBtn}
          variant="outlined"
          onClick={onClose}
        >
          <CloseIcon htmlColor="inherit" size="xxs" />
        </Button>
      )}

      {children}
    </DialogMUI>
  );
};
