import { IconButton } from '@mui/material';
import { Close } from '@ankr.com/ui';

import { HeaderContent } from 'modules/layout/components/Header/components/HeaderContent';
import { Logo } from 'modules/layout/components/Logo';
import { SidebarProps, SideBar } from 'modules/layout/components/SideBar';

import { useMobileSideBarStyles } from './useMobileSideBarStyles';

interface MobileSideBarProps extends SidebarProps {
  onClose: () => void;
  isOpened: boolean;
}
export const MobileSideBar = ({
  onClose,
  isOpened,
  ...props
}: MobileSideBarProps) => {
  const { classes } = useMobileSideBarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo />
        <IconButton onClick={onClose} className={classes.close}>
          <Close />
        </IconButton>
      </div>
      <div className={classes.header}>
        <HeaderContent isMobileSideBar />
      </div>
      <SideBar {...props} isMobileSiderBar />
    </div>
  );
};
