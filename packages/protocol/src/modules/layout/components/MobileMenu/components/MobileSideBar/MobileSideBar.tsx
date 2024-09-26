import { IconButton } from '@mui/material';
import { Close } from '@ankr.com/ui';

import { SidebarProps, SideBar } from 'modules/layout/components/SideBar';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';

import { useMobileSideBarStyles } from './useMobileSideBarStyles';

interface MobileSideBarProps extends SidebarProps {
  onClose: () => void;
  isOpened: boolean;
}
export const MobileSideBar = ({
  isOpened,
  onClose,
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
      <SideBar {...props} handleSidebarClose={onClose} isMobileSideBar />
    </div>
  );
};
