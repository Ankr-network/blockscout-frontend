import { Fade, Menu } from '@mui/material';
import { ReactNode } from 'react';

interface SignupMenuProps {
  isOpened: boolean;
  anchorEl: null | HTMLButtonElement;
  handleClose: () => void;
  children: ReactNode;
  className?: string;
}

export const SignupMenu = ({
  isOpened,
  anchorEl,
  handleClose,
  children,
  className,
}: SignupMenuProps) => {
  return (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      open={isOpened}
      onClose={handleClose}
      TransitionComponent={Fade}
      disableScrollLock
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      classes={{
        list: className,
      }}
      PaperProps={{
        style: {
          width: 400,
          boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        },
      }}
    >
      {children}
    </Menu>
  );
};
