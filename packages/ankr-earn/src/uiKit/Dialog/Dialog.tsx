import { Dialog as DialogMUI, DialogProps } from '@material-ui/core';
import classNames from 'classnames';

import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';

import { useDialogStyles as useStyles } from './useDialogStyles';

interface IDialogProps extends DialogProps {
  onClose?: () => void;
}

export const Dialog = ({
  open,
  onClose,
  className,
  children,
  classes: dialogClasses,
  PaperProps,
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
      <Button className={classes.closeBtn} variant="outlined" onClick={onClose}>
        <CloseIcon htmlColor="inherit" size="xxs" />
      </Button>

      {children}
    </DialogMUI>
  );
};
