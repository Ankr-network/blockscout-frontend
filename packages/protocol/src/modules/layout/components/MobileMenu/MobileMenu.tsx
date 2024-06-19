import { Drawer, IconButton } from '@mui/material';
import { MenuBurger } from '@ankr.com/ui';

import { useMobileMenuStyles } from './useMobileMenuStyles';
import { useMobileMenu } from './hooks/useMobileMenu';
import { MobileSideBar } from './components/MobileSideBar';
import { SidebarProps } from '../SideBar';

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
        transitionDuration={125}
        disableEnforceFocus
        open={isOpened}
        onClose={handleClose}
      >
        <MobileSideBar {...props} isOpened={isOpened} onClose={handleClose} />
      </Drawer>
    </>
  );
};
