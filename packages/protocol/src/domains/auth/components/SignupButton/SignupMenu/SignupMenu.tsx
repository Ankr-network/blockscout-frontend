import { Fade, Menu } from '@material-ui/core';
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
      getContentAnchorEl={null}
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
      className={className}
      classes={{
        list: className,
      }}
      PaperProps={{
        style: {
          width: 400,
        },
      }}
    >
      {children}
    </Menu>
  );
};
