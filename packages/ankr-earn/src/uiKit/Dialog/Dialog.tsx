import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { Dialog as DialogMUI } from '@material-ui/core';
import { useDialogStyles as useStyles } from './useDialogStyles';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface IDialogProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
}

export const Dialog = ({
  open,
  onClose,
  className,
  children,
}: IDialogProps) => {
  const classes = useStyles();

  return (
    <DialogMUI
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ square: false, variant: 'elevation' }}
      classes={{ paper: classNames(classes.box, className) }}
      scroll="body"
    >
      <Button variant="outlined" className={classes.closeBtn} onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="inherit" />
      </Button>

      {children}
    </DialogMUI>
  );
};
