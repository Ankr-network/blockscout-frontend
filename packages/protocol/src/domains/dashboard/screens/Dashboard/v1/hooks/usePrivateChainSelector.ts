import { useMemo } from 'react';
import { MenuProps } from '@mui/material';

import { useDashboardStyles } from 'domains/dashboard/screens/Dashboard/useDashboardStyles';

export const usePrivateChainSelector = () => {
  const { classes } = useDashboardStyles();

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
