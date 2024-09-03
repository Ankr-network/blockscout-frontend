import { useMemo } from 'react';
import { MenuProps } from '@mui/material';

import { useDashboardStyles } from 'domains/dashboard/screens/Dashboard/useDashboardStyles';
import { useHeaderBannerHeight } from 'modules/layout/components/HeaderBanner/useHeaderBannerHeight';

export const usePrivateChainSelector = () => {
  const bannerHeight = useHeaderBannerHeight();
  const { classes } = useDashboardStyles(bannerHeight);

  const menuProps: Partial<MenuProps> = useMemo(
    () => ({
      disableScrollLock: true,
      classes: {
        paper: classes.menuPaper,
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    }),
    [classes.menuPaper],
  );

  return {
    classNameMenuItem: classes.menuItemWrapper,
    menuProps,
  };
};
