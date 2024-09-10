import { Drawer, IconButton } from '@mui/material';
import { MenuBurger } from '@ankr.com/ui';

import { MobileSideBar } from './components/MobileSideBar';
import { SidebarProps } from '../SideBar';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useMobileMenuStyles } from './useMobileMenuStyles';

export const MobileMenu = ({ ...props }: SidebarProps) => {
  const { classes } = useMobileMenuStyles();

  const { anchorEl, handleClick, handleClose, isOpened } = useMobileMenu();

  return (
    <>
      <IconButton ref={anchorEl} onClick={handleClick} className={classes.root}>
        <MenuBurger />
      </IconButton>
      <Drawer
        classes={{ paper: classes.paper }}
        disableEnforceFocus
        keepMounted
        onClose={handleClose}
        open={isOpened}
        transitionDuration={125}
      >
        <MobileSideBar {...props} isOpened={isOpened} onClose={handleClose} />
      </Drawer>
    </>
  );
};
