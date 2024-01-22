import { IconButton } from '@mui/material';
import { Close } from '@ankr.com/ui';
import GlobalMenu, { LogoType } from '@ankr.com/global-menu';

import { HeaderContent } from 'modules/layout/components/Header/components/HeaderContent';
import { SidebarProps, SideBar } from 'modules/layout/components/SideBar';
import { Header } from 'modules/layout/const';

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
        <GlobalMenu logoType={LogoType.RPC} hasSecondaryFont />
        <IconButton onClick={onClose} className={classes.close}>
          <Close />
        </IconButton>
      </div>
      <div className={classes.header}>
        <HeaderContent type={Header.Sidebar} />
      </div>
      <SideBar {...props} isMobileSideBar />
    </div>
  );
};
