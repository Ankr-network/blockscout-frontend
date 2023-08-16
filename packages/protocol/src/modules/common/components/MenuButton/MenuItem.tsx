import { MenuItem as BaseMenuItem, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useMenuButtonStyles } from './useMenuButtonStyles';

interface MenuItemProps {
  startIcon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem = ({
  startIcon,
  children,
  disabled,
  onClick,
}: MenuItemProps) => {
  const { classes } = useMenuButtonStyles({
    isOpened: undefined,
    isLightTheme: undefined,
  });

  return (
    <BaseMenuItem
      variant="text"
      disabled={disabled}
      className={classes.menuItem}
      startIcon={<div className={classes.menuItemIcon}>{startIcon}</div>}
      component={Button}
      onClick={onClick}
    >
      <Typography variant="body2" className={classes.menuItemText}>
        {children}
      </Typography>
    </BaseMenuItem>
  );
};
