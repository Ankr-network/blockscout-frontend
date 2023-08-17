import { Button } from '@mui/material';
import { ReactNode } from 'react';

import { useMenuButtonStyles } from './useMenuButtonStyles';

interface MenuButtonProps {
  isLoading: boolean;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  desktopContent: ReactNode;
  mobileContent: ReactNode;
  isSidebarType: boolean;
  isMobileType: boolean;
  isDefaultType: boolean;
}

export const MenuButton = ({
  isLoading,
  onOpen,
  desktopContent,
  mobileContent,
  isSidebarType,
  isMobileType,
  isDefaultType,
}: MenuButtonProps) => {
  const { cx, classes } = useMenuButtonStyles();

  return (
    <Button
      variant="text"
      disabled={isLoading}
      onClick={onOpen}
      className={cx({
        [classes.buttonDesktop]: isSidebarType || isDefaultType,
        [classes.buttonDesktopWithMobileSidebar]: isSidebarType,
        [classes.buttonMobile]: isMobileType,
      })}
    >
      <div
        className={cx(classes.desktopContent, {
          [classes.desktopContentWithMobileSidebar]: isSidebarType,
        })}
      >
        {desktopContent}
      </div>
      {mobileContent}
    </Button>
  );
};
