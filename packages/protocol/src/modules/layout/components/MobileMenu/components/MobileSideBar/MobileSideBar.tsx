import { IconButton } from '@mui/material';
import { Close } from '@ankr.com/ui';

import { HeaderContent } from 'modules/layout/components/Header/components/HeaderContent';
import { SidebarProps, SideBar } from 'modules/layout/components/SideBar';
import { Header } from 'modules/layout/const';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';

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
        <GlobalMenuWrapper />
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
