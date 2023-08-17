import { Fade, Menu } from '@mui/material';
import { ReactNode } from 'react';

import { useSignupMenuStyles } from './useSignupMenuStyles';

interface SignupMenuProps {
  isOpened: boolean;
  anchorEl: null | HTMLButtonElement;
  handleClose: () => void;
  children: ReactNode;
}

export const SignupMenu = ({
  isOpened,
  anchorEl,
  handleClose,
  children,
}: SignupMenuProps) => {
  const { classes } = useSignupMenuStyles();

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
        list: classes.menu,
      }}
      PaperProps={{
        className: classes.paper,
      }}
    >
      {children}
    </Menu>
  );
};
