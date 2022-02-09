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
}: IDialogProps) => {
  const classes = useStyles();

  return (
    <DialogMUI
      {...restDialogProps}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ ...PaperProps, square: false, variant: 'elevation' }}
      classes={{ ...dialogClasses, paper: classNames(classes.box, className) }}
      scroll="body"
    >
      <Button variant="outlined" className={classes.closeBtn} onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="inherit" />
      </Button>

      {children}
    </DialogMUI>
  );
};
